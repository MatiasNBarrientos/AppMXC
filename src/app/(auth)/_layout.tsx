import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


const RootNavigation = () => {
  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          android: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
    </Tabs>
    
  );
}
export default RootNavigation;
