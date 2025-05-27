import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }: any) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress < 1) {
          return oldProgress + 0.04;
        } else {
          return oldProgress;
        }
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      checkSessionAndRedirect();
    }
  }, [progress]);

  const checkSessionAndRedirect = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      if (session) {
        navigation.replace('MainApp'); // Usuario con sesión activa
      } else {
        navigation.replace('Onboarding'); // Usuario nuevo o sin sesión
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      navigation.replace('Onboarding'); // Por si falla AsyncStorage
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>BeatApp</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressBarFill, { flex: progress }]} />
        <View style={[styles.progressBarEmpty, { flex: 1 - progress }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  appName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#444',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#1DB954',
  },
  progressBarEmpty: {
    backgroundColor: 'transparent',
  },
});
