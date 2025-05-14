import { Tabs } from 'expo-router';
import React from 'react';


const RootNavigation = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Oculta la barra de navegación
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}
export default RootNavigation;
