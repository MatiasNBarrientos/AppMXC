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
          height: 44, 
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
    bottom: 0,
    left: 0,  
    right: 0,  
    height: 60,
    borderTopLeftRadius: 15,  
    borderTopRightRadius: 15,  
    borderRadius: 0, 
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
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
  createButtonContainer: {
    position: 'absolute',
    top: -15,  
    width: 44,  
    height: 44,  
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
    top: -15,  
  },
  createButton: {
    width: 65,  
    height: 65,  
    borderRadius: 20,  
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