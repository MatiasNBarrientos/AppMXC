import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { StyleSheet, Platform } from 'react-native';
import { CartProvider } from '../../context/CartContext';

export default function BuyerLayout() {
  const styles = StyleSheet.create({
    tabBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 8,
          borderTopWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      }),
    },
  });

  const dynamicStyles = useDynamicStyles();

  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            { backgroundColor: dynamicStyles.themeColors.background2 },
          ],
          tabBarShowLabel: false,
          tabBarActiveTintColor: dynamicStyles.themeColors.primary,
          tabBarInactiveTintColor: dynamicStyles.themeColors.secondary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            href:null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="payment"
          options={{
            href:null,
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            href:null,
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            href: null,
          }}
        />

      </Tabs>
    </CartProvider>
  );
}
