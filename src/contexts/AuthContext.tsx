import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface AuthContextType {
  user: any | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token with the server
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      const response = await apiService.login({ usernameOrEmail, password });
      setUser(response);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      await apiService.register({ email, username, password });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiService.clearToken();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};