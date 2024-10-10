import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile'; // Kullanıcı profil bileşeni
import Home from './components/Home';
import UserSettings from './components/UserSettings';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Karbon Ayak İzi API</h1>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ana sayfa */}
          <Route path="/profile" element={<UserProfile />} /> {/* Kullanıcı profili */}
          <Route path="/settings" element={<UserSettings />} /> {/* Kullanıcı ayarları */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


