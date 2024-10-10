import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web'; 

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    console.log('Giriş yapılıyor...', { email, password });
  };

  // React Spring animasyonları
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 1000 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 800 },
    delay: 1000,
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#282c34' }}>
      <animated.form
        onSubmit={handleLogin}
        style={{
          ...formAnimation,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#333' }}>Giriş Yap</h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresinizi girin"
          style={{
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrenizi girin"
          style={{
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <animated.button
          type="submit"
          style={{
            ...buttonAnimation,
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Giriş Yap
        </animated.button>
      </animated.form>
    </div>
  );
};

export default Home;

