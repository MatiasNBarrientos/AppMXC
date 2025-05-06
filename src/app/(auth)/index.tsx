import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window'); // Obtén las dimensiones de la pantalla

export default function IndexAuth() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELL AND BUY BEATS</Text>
      <Image
        source={require('../../assets/record.png')} // Asegúrate de que la ruta sea correcta
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createAccountButton]}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.createAccountText}>Create a new account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.signInText}>Sign in</Text>
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
    paddingHorizontal: width * 0.05, // 5% del ancho de la pantalla
    paddingVertical: height * 0.02, // 2% del alto de la pantalla
  },
  title: {
    fontSize: width * 0.06, // 6% del ancho de la pantalla
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  image: {
    width: width * 0.8, // 80% del ancho de la pantalla
    height: height * 0.3, // 30% del alto de la pantalla
    borderRadius: 15,
    marginBottom: height * 0.04,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: height * 0.02, // Espaciado entre botones basado en el alto de la pantalla
  },
  button: {
    width: width * 0.8, // 80% del ancho de la pantalla
    paddingVertical: height * 0.015, // 1.5% del alto de la pantalla
    borderRadius: 25,
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#6A0DAD', // Púrpura oscuro
  },
  signInButton: {
    backgroundColor: '#000', // Negro
  },
  createAccountText: {
    color: '#fff', // Blanco
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#fff', // Blanco
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});