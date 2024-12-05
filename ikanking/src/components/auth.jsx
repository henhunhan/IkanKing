// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi untuk logout otomatis jika token expired
  const checkTokenExpiry = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Jika token expired, logout pengguna
        handleLogout();
      }
    } catch (error) {
      console.error('Error checking token expiry:', error);
    }
  };

  // Tambahkan efek untuk mengecek token setiap beberapa detik
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        checkTokenExpiry();
      }
    }, 30000); // Cek setiap 30 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
