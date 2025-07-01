import {View,Text,SafeAreaView,StyleSheet,Image,ActivityIndicator,useColorScheme,Animated,} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import imagePath from '@/src/constants/imagePath';
import { useDynamicStyles, colors } from '@/src/styles/globalStyles';
import { useFonts, RuslanDisplay_400Regular } from '@expo-google-fonts/ruslan-display';
import { router } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/src/utils/context/authcontext';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const FULL_TITLE = 'MelodyXChange';

const Auth = () => {
  const [fontsLoaded] = useFonts({ RuslanDisplay_400Regular });
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [step, setStep] = useState<'typing' | 'loading'>('typing');
  const [isLoading, setIsLoading] = useState(true);

  const fadeText = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const fadeOutContainer = useRef(new Animated.Value(1)).current;

  const { signIn, isAuthenticated } = useAuth();
  const systemColorScheme = useColorScheme();
  const isDarkMode = systemColorScheme === 'dark';
  const dynamicStyles = useDynamicStyles();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  // Maquinita de escribir para el nombre de la app
  useEffect(() => {
    if (fontsLoaded && displayedTitle.length < FULL_TITLE.length) {
      const timeout = setTimeout(() => {
        setDisplayedTitle(FULL_TITLE.slice(0, displayedTitle.length + 1));
      }, 180);
      return () => clearTimeout(timeout);
    } else if (displayedTitle === FULL_TITLE) {
      animateIntro();
    }
  }, [displayedTitle, fontsLoaded]);

  const animateIntro = () => {
    // Zoom logo
    Animated.timing(scaleLogo, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Fade in y fade out
    Animated.sequence([
      Animated.timing(fadeText, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(fadeText, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep('loading');
    });
  };

  const checkAuthStatus = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));

      const [userData, isLoggedIn, userRole] = await Promise.all([
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('isLoggedIn'),
        AsyncStorage.getItem('userRole'),
      ]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (userData && isLoggedIn === 'true') {
        const parsedUserData = JSON.parse(userData);
        await signIn(parsedUserData);

        setTimeout(() => {
          router.replace(
            userRole === 'buyer'
              ? '/(buyer)'
              : userRole === 'seller'
              ? '/(seller)'
              : '/(auth)/welcome'
          );
        }, 1000);
      } else {
        await AsyncStorage.multiRemove(['userData', 'isLoggedIn', 'userRole']);
        setTimeout(() => {
          router.replace('/(auth)/welcome');
        }, 1000);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setTimeout(() => {
        router.replace('/(auth)/welcome');
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (step === 'loading') {
      checkAuthStatus();
    }
  }, [step]);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  const fadeOutScreen = () => {
    Animated.timing(fadeOutContainer, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Una vez que se desvanece la pantalla, se redirige..
      checkAuthStatus();
    });
  };

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
    <SafeAreaView
      style={[
        dynamicStyles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <Animated.View
        style={[{ flex: 1, opacity: fadeOutContainer }]}
      >
        <View style={dynamicStyles.header} />

        <View style={dynamicStyles.body}>
          <Text style={styles.MelodyText}>{displayedTitle}</Text>

          <Animated.Image
            source={imagePath.logo}
            style={[dynamicStyles.logoStyle, { transform: [{ scale: scaleLogo }] }]}
            resizeMode="contain"
          />
        </View>

        <View style={dynamicStyles.footer}>
          {step === 'typing' && (
            <Animated.View style={{ opacity: fadeText, alignItems: 'center' }}>
              <Text style={styles.FromText}>Made with ❤️ by</Text>
              <Text style={styles.TeamText}>MXC TEAM</Text>
            </Animated.View>
          )}

          {step === 'loading' && (
            <>
              <ActivityIndicator size={moderateScale(48)} color={themeColors.primary} />
              <Text style={styles.TeamText}>Loading...</Text>
            </>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Auth;
