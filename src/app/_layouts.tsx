import { View } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../utils/context/authcontext';

const RootNavigationInner = () => {
  const { user } = useAuth();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {user ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />}
    </>
  );
};

export default function RootNavigation() {
  return (
    <AuthProvider>
      <RootNavigationInner />
    </AuthProvider>
  );
}
