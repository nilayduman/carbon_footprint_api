import React, { useState } from 'react';
import axios from 'axios';

const UserSettings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Form validasyonu
        if (!username || !email) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }

        try {
            await axios.put('/profile', { username, email });
            alert('Profil güncellendi!');
            setError(''); // Hata mesajını temizle
        } catch (err) {
            setError('Güncelleme sırasında bir hata oluştu.');
        }
    };

    return (
        <div>
            <h2>Kullanıcı Ayarları</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Kullanıcı Adı:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Güncelle</button>
            </form>
        </div>
    );
};

export default UserSettings;

