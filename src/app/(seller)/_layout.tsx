import { Tabs,Stack, usePathname } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDynamicStyles } from '@/src/styles/globalStyles';

const RootNavigation = () => {
  const dynamicStyles = useDynamicStyles();
  const pathname = usePathname();
  const isCreateActive = pathname === '/create';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: dynamicStyles.themeColors.background2 }],
        tabBarShowLabel: false,
        tabBarActiveTintColor: dynamicStyles.themeColors.primary,
        tabBarInactiveTintColor: dynamicStyles.themeColors.secondary,
        tabBarItemStyle: {
          height: 44, // Altura mínima recomendada
          paddingVertical: 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => (
            <View style={[

              styles.createButtonContainer,
              isCreateActive && styles.createButtonContainerSmall
            ]}>
              <View style={[

                styles.createButton,
                { backgroundColor: dynamicStyles.themeColors.primary },
                isCreateActive && styles.createButtonSmall
              ]}>
                <Ionicons
                  name="add"
                  size={isCreateActive ? 28 : 44}
                  color="#FFF"
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
          name="player"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0, // Cambiado de 25 a 0
    left: 0, // Cambiado de 20 a 0
    right: 0, // Cambiado de 20 a 0
    height: 60,
    borderTopLeftRadius: 15, // Añadido para mantener las esquinas redondeadas
    borderTopRightRadius: 15, // Añadido para mantener las esquinas redondeadas
    borderRadius: 0, // Eliminado el border radius general
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4, // Cambiado a -4 para que la sombra esté arriba
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
        borderTopWidth: 1, // Cambiado a solo borde superior
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    }),
  },
  createButtonContainer: {
    position: 'absolute',
    top: -15, // Cambiado de -22 a -15 para bajar el botón
    width: 44, // Ancho mínimo recomendado
    height: 44, // Altura mínima recomendada
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  createButtonContainerSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    top: -15, // Ajustado también para el estado activo
  },
  createButton: {
    width: 65, // Ancho mínimo recomendado
    height: 65, // Altura mínima recomendada
    borderRadius: 20, // Mitad del ancho para un círculo perfecto
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});

export default RootNavigation;