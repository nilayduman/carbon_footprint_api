import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import './UserProfile.css'; 


interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}


  const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response: AxiosResponse<User> = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setSuccessMessage("Profil bilgileri başarıyla yüklendi.");
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Profil alınırken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2>Kullanıcı Profili</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      <p><strong>Ad:</strong> {user?.firstName}</p>
      <p><strong>Soyad:</strong> {user?.lastName}</p>
      <p><strong>Yaş:</strong> {user?.age}</p>
      <p><strong>Cinsiyet:</strong> {user?.gender}</p>
      
    </div>
  );
};

export default UserProfile;


