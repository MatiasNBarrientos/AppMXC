import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELL AND BUY BEATS</Text>

      <Image
        source={require('../../assets/record.png')} 
        style={styles.image}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createAccountButton]}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Create a new account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    color: '#000',
    marginBottom: height * 0.03,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 15,
    marginBottom: height * 0.04,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: height * 0.02,
  },
  button: {
    width: width * 0.8,
    paddingVertical: height * 0.015,
    borderRadius: 25,
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#6A0DAD',
  },
  signInButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
  },
});
