import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/src/utils/context/authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { loading, isAuthenticated, signIn } = useAuth();
  const [logueadoAnteriormente, setLogueadoAnteriormente] = React.useState<boolean | null>(null);
  const [checking, setChecking] = React.useState(true);
  const [role, setRole] = React.useState<string | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

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

  if (loading || checking || logueadoAnteriormente === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Renderiza el stack correspondiente según el rol
  if (isAuthenticated) {
    if (role === 'buyer') {
      return (
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      );
    } else if (role === 'seller') {
      return <Stack screenOptions={{ headerShown: false }} />;
    } else {
      return <Redirect href="/" />;
    }
  } else if (logueadoAnteriormente) {
    return <Redirect href="/(auth)/start" />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Redirect href="/(auth)/start" />
    </>
  );
}