const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// JWT doğrulama middleware'i
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401); // Token yoksa 401 Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user; // Kullanıcı bilgilerini req.user'da sakla
    next(); // İsteği bir sonraki middleware'e veya endpoint'e yönlendir
  });
};

// ana sayfa endpoint
app.get('/', (req, res) => {
  res.send('Karbon Ayak İzi API’ye Hoşgeldiniz');
});

// Kullanıcı kaydı

app.post('/register', async (req, res) => {
     const { username, email, password, firstName, lastName, age, gender } = req.body;
   
     try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({ 
         username, 
         email, 
         password: hashedPassword,
         firstName,
         lastName,
         age,
         gender
       });
       await newUser.save();
       res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
     } catch (error) {
       res.status(400).json({ error: 'Kullanıcı kaydı sırasında hata oluştu: ' + error.message });
     }
   });
   

// Kullanıcı girişi
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Geçersiz şifre.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Giriş sırasında hata oluştu: ' + error.message });
  }
});
// Kullanıcı profilini döndüren endpoint
app.get('/profile', authenticateToken, async (req, res) => {
     try {
       const user = await User.findById(req.user.userId).select('-password'); // Şifreyi döndürmemek için -password kullanılır
       if (!user) {
         return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
       }
       res.json(user); // Kullanıcı bilgilerini döndür
     } catch (error) {
       res.status(500).json({ error: 'Profil bilgileri alınırken hata oluştu: ' + error.message });
     }
   });
   

// Karbon ayak izi hesaplama endpoint'i
app.post('/calculate', authenticateToken, async (req, res) => {
  const userData = req.body;
  const userId = req.user.userId; // JWT'den alınacak

  const totalCO2 = calculateCarbonFootprint(userData);

  // Karbon ayak izini veritabanına kaydet
  const carbonFootprint = new CarbonFootprint({
    userId,
    electricity_consumption: userData.electricity_consumption,
    car_travel: userData.car_travel,
    public_transport: userData.public_transport,
    air_travel: userData.air_travel,
    water_consumption: userData.water_consumption,
    waste_production: userData.waste_production,
    recycling: userData.recycling,
    calculatedCO2: totalCO2,
  });

  await carbonFootprint.save();

  res.json({
    message: 'Karbon ayak iziniz hesaplandı!',
    totalCO2: totalCO2.toFixed(2) + ' kg CO2'
  });
});

// Karbon emisyon katsayıları
const carbonFactors = {
  electricity: 0.233,     // kg CO2 per kWhcd "C:\Users\Nilay\Desktop\Büyük Projeler\c3"

  car: 0.120,             // kg CO2 per km
  publicTransport: 0.089, // kg CO2 per km
  airTravel: 0.115,       // kg CO2 per km
  water: 0.0003,          // kg CO2 per litre
  waste: 0.15,            // kg CO2 per kg
  recycling: {
    plastic: -1.5,        // kg CO2 per kg
    metal: -1.5           // kg CO2 per kg
  }
};

// Karbon ayak izi hesaplama fonksiyonu
const calculateCarbonFootprint = (data) => {
  let totalCO2 = 0;

  totalCO2 += data.electricity_consumption * carbonFactors.electricity;
  totalCO2 += data.car_travel * carbonFactors.car;
  totalCO2 += data.public_transport * carbonFactors.publicTransport;
  totalCO2 += data.air_travel * carbonFactors.airTravel;
  totalCO2 += data.water_consumption * carbonFactors.water;
  totalCO2 += data.waste_production * carbonFactors.waste;

  if (data.recycling) {
    totalCO2 += data.recycling.plastic * carbonFactors.recycling.plastic;
    totalCO2 += data.recycling.metal * carbonFactors.recycling.metal;
  }

  return totalCO2;
};

// API'nin dinlemesi gereken port
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
