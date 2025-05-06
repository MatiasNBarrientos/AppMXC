import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    Alert.alert('Éxito', 'Inicio de sesión exitoso.');
    router.push('/(main)'); // Redirige al área principal después de loguearse
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.footerText}>
          I'm a new user. <Text style={styles.footerLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.03,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: height * 0.015,
    marginBottom: height * 0.02,
    fontSize: width * 0.045,
    color: '#000',
  },
  button: {
    backgroundColor: '#6A0DAD',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    color: '#000',
    textAlign: 'center',
  },
  footerLink: {
    color: '#6A0DAD',
    fontWeight: 'bold',
  },
});