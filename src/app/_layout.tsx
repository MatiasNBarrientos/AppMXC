import React from 'react';
import { Platform } from 'react-native';
import { Redirect, Stack } from 'expo-router';

const RootNavigation = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isLogin ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />}
    </>
  );
}
export default RootNavigation;
