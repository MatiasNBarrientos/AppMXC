import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Stack } from 'expo-router'
import { AuthProvider, useAuth } from '@/src/utils/context/authcontext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { loading, isAuthenticated, signIn } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const [userData, isLoggedIn] = await Promise.all([
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('isLoggedIn')
      ]);

      if (userData && isLoggedIn === 'true') {
        const parsedUserData = JSON.parse(userData);
        await signIn(parsedUserData);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      // Limpiar storage en caso de error
      await AsyncStorage.multiRemove(['userData', 'isLoggedIn']);
    }
  };
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {!loading && (
        // <Redirect 
        //   href={isAuthenticated ? '/(main)' : '/(auth)/welcome'} 
        <Redirect href={isAuthenticated ? '/(buyer)' : '/(auth)/welcome'} />
      )}
    </>
  );
}