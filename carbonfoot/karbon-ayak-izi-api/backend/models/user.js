import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token'ı yerel depolamadan al
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Sunucudan gelen kullanıcı bilgilerini ayarla
      } catch (err) {
        setError('Profil bilgileri alınırken bir hata oluştu.');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>{error}</div>; // Hata mesajını göster
  }

  if (!user) {
    return <div>Yükleniyor...</div>; // Yüklenme durumu
  }

  return (
    <div className="user-profile">
      <h1>Kullanıcı Profili</h1>
      <p><strong>Ad:</strong> {user.firstName}</p>
      <p><strong>Soyad:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Yaş:</strong> {user.age}</p>
      <p><strong>Cinsiyet:</strong> {user.gender}</p>
    </div>
  );
};

export default UserProfile;


