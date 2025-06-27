import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextData {
  signIn: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  userData: any | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const storedIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUserData = await AsyncStorage.getItem('userData');

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      setIsAuthenticated(storedIsLoggedIn === 'true');
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos de autenticación:', error);
      setLoading(false);
    }
  }

  async function signIn(data: any): Promise<void> {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    }
  }

  async function signOut(): Promise<void> {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        loading, 
        signIn, 
        signOut,
        userData 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
}