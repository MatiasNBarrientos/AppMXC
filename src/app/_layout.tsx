import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/src/utils/context/authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider } from '../context/CartContext';
import { createDefaultUsers } from '../constants/defaultUsers';
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { loading, isAuthenticated, signIn } = useAuth();
  const [checking, setChecking] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [logueadoAnteriormente, setLogueadoAnteriormente] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    createDefaultUsers();
  }, []);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const [userData, isLoggedIn, loggedBefore, userRole] = await Promise.all([
          AsyncStorage.getItem('userData'),
          AsyncStorage.getItem('isLoggedIn'),
          AsyncStorage.getItem('logueadoAnteriormente'),
          AsyncStorage.getItem('userRole'),
        ]);

        setLogueadoAnteriormente(loggedBefore === 'true');
        setRole(userRole);

        if (userData && isLoggedIn === 'true') {
          const parsedUserData = JSON.parse(userData);
          await signIn(parsedUserData);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        await AsyncStorage.multiRemove(['userData', 'isLoggedIn', 'logueadoAnteriormente', 'userRole']);
      } finally {
        setChecking(false);
      }
    };

    checkAuthentication();
  }, []);

  // Redirige cuando todo está listo y montado
  useEffect(() => {
    if (!loading && !checking && logueadoAnteriormente !== null) {
      if (isAuthenticated) {
        if (role === 'buyer') {
          router.replace('/(buyer)');
        } else if (role === 'seller') {
          router.replace('/(seller)');
        } else {
          router.replace('/(auth)/welcome');
        }
      } else if (logueadoAnteriormente) {
        router.replace('/(auth)/start');
      }
    }
  }, [loading, checking, isAuthenticated, logueadoAnteriormente, role]);

  // Pantalla de carga mientras se verifica el estado
  if (loading || checking || logueadoAnteriormente === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Muy importante: siempre renderiza <Stack /> para evitar el error
  return (
    <CartProvider>
      <Stack screenOptions={{ 
        headerShown: false,
        statusBarHidden: true,
       }} />
    </CartProvider>
  );
}
