const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const CarbonFootprint = require('../models/CarbonFootprint'); 

const router = express.Router();

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
    const { username, email, password, firstName, lastName, age, gender } = req.body;

    try {
        // Şifreyi hashle
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
router.post('/login', async (req, res) => {
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

// Kullanıcı profilini görüntüleme
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Şifreyi döndürme
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Profil bilgileri alınırken hata oluştu: ' + error.message });
    }
});

// Kullanıcının karbon ayak izi verilerini al
router.get('/carbon-footprint', authenticateToken, async (req, res) => {
    try {
        const carbonFootprints = await CarbonFootprint.find({ userId: req.user.userId });
        const footprintData = carbonFootprints.map(footprint => [
            footprint.electricity_consumption,
            footprint.car_travel,
            footprint.public_transport,
            footprint.air_travel,
            footprint.water_consumption,
            footprint.waste_production,
            footprint.recycling.plastic + footprint.recycling.metal // Geri dönüşüm verileri
        ]);
        res.json(footprintData);
    } catch (error) {
        res.status(500).json({ error: 'Karbon ayak izi verileri alınırken hata oluştu: ' + error.message });
    }
});

// JWT doğrulama middleware'i
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.sendStatus(401); // Token yoksa 401 Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Geçersiz token ise 403 Forbidden
        req.user = user; // Kullanıcı bilgilerini req.user'da sakla
        next(); // İsteği bir sonraki middleware'e veya endpoint'e yönlendir
    });
}

module.exports = router;

