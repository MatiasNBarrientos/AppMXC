import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import imagePath from '@/src/constants/imagePath';
import { useDynamicStyles, colors } from '@/src/styles/globalStyles';
import { useFonts, RuslanDisplay_400Regular } from '@expo-google-fonts/ruslan-display';
import { router } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/src/utils/context/authcontext';

const Auth = () => {
  const [fontsLoaded] = useFonts({
    RuslanDisplay_400Regular,
  });

  const systemColorScheme = useColorScheme();
  const [isDarkMode] = useState(systemColorScheme === 'dark');
  const [isLoading, setIsLoading] = useState(true);
  const { signIn, isAuthenticated } = useAuth();

  const dynamicStyles = useDynamicStyles();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const checkAuthStatus = async () => {
    try {
      const [userData, isLoggedIn, userRole] = await Promise.all([
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('isLoggedIn'),
        AsyncStorage.getItem('userRole'),
      ]);

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (userData && isLoggedIn === 'true') {
        const parsedUserData = JSON.parse(userData);
        await signIn(parsedUserData);

        if (userRole === 'buyer') {
          router.replace('/(buyer)/index');
        } else if (userRole === 'seller') {
          router.replace('/(seller)');
        } else {
          router.replace('/(auth)/welcome');
        }
      } else {
        await Promise.all([
          AsyncStorage.removeItem('userData'),
          AsyncStorage.removeItem('isLoggedIn'),
          AsyncStorage.removeItem('userRole'),
        ]);
        router.replace('/(auth)/welcome');
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      router.replace('/(auth)/welcome');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (fontsLoaded) {
      checkAuthStatus();
    }
    // Añadir isAuthenticated como dependencia
  }, [fontsLoaded, isAuthenticated]);

  const styles = StyleSheet.create({
    MelodyText: {
      fontSize: moderateScale(30),
      color: themeColors.primary,
      textAlign: 'center',
      fontFamily: 'RuslanDisplay_400Regular',
    },
    FromText: {
      fontSize: moderateScale(12),
      color: themeColors.secondary,
    },
    TeamText: {
      fontSize: moderateScale(15),
      fontWeight: 'bold',
      color: themeColors.secondary,
    },
  });

  return (
    <SafeAreaView style={[dynamicStyles.container, { backgroundColor: themeColors.background }]}>
      <View style={dynamicStyles.header}></View>
      <View style={dynamicStyles.body}>
        <Text style={styles.MelodyText}>MelodyXChange</Text>
        <Image source={imagePath.logo} style={dynamicStyles.logoStyle} resizeMode="contain" />
      </View>
      <View style={dynamicStyles.footer}>
        {isLoading ? (
          <>
            <ActivityIndicator size={moderateScale(48)} color={themeColors.primary} />
            <Text style={styles.TeamText}>Loading...</Text>
          </>
        ) : (
          <>
            <Text style={styles.FromText}>Made with ❤️ by</Text>
            <Text style={styles.TeamText}>MXC TEAM</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Auth;