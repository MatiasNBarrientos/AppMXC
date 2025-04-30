import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


const RootNavigation = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <Stack>
      <Stack screenOptions={{ headerShown: false }} />
      (isLogin ? <Redirect href="/(main)" /> : <Redirect href="/login" />)
    </Stack>
  );
}
export default RootNavigation;
