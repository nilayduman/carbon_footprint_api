document.getElementById('carbonFootprintForm').addEventListener('submit', async (e) => { 
    e.preventDefault();

    // Form verilerini al ve sayıya çevir
    const electricityConsumption = Number(document.getElementById('electricity_consumption').value);
    const carTravel = Number(document.getElementById('car_travel').value);
    const publicTransport = Number(document.getElementById('public_transport').value);
    const airTravel = Number(document.getElementById('air_travel').value);
    const waterConsumption = Number(document.getElementById('water_consumption').value);
    const wasteProduction = Number(document.getElementById('waste_production').value);
    const recyclingPlastic = Number(document.getElementById('recycling_plastic').value);
    const recyclingMetal = Number(document.getElementById('recycling_metal').value);

    // Pozitif sayı kontrolü
    if ([electricityConsumption, carTravel, publicTransport, airTravel, waterConsumption, wasteProduction, recyclingPlastic, recyclingMetal].some(val => val < 0)) {
        document.getElementById('result').innerText = 'Lütfen tüm alanlara pozitif değerler girin.';
        return;
    }

    // Kullanıcı verileri
    const userData = {
        electricity_consumption: electricityConsumption,
        car_travel: carTravel,
        public_transport: publicTransport,
        air_travel: airTravel,
        water_consumption: waterConsumption,
        waste_production: wasteProduction,
        recycling: {
            plastic: recyclingPlastic,
            metal: recyclingMetal
        }
    };

    // API isteği
    try {
        // Yüklenme animasyonu göster
        document.getElementById('result').innerText = 'Hesaplanıyor...';

        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData)
        });

        // API yanıtını işle
        const result = await response.json();
        if (response.ok) {
            document.getElementById('result').innerText = `Hesaplanan Karbon Ayak İzi: ${result.totalCO2}`;
        } else {
            document.getElementById('result').innerText = `Hata: ${result.error}`;
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Bir ağ hatası oluştu. Lütfen daha sonra tekrar deneyin.';
    }
});
