import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/auth';
import { getAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on load
    const token = getAuthToken();
    const email = localStorage.getItem('user_email');
    if (token && email) {
      setUser({ email, isAdmin: email.includes('admin') });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      // API response: { token, email }
      if (data.token) {
        localStorage.setItem('user_email', data.email);
        setUser({ email: data.email, isAdmin: data.email.includes('admin') });
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    return await register(userData);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user_email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout, register: handleRegister, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
