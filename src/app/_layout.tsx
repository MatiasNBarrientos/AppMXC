import React from 'react';
import { Platform } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../utils/context/authcontext';

/*const RootNavigation = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isLogin ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />}
    </>
  );
}*/

const RootNavigation = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // O un componente de carga
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isAuthenticated ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />}
    </>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
};

export default RootLayout;