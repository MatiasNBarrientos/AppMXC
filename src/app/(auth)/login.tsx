import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../utils/context/authcontext';


const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  useEffect(() => {
    checkStoredCredentials();
  }, []);

  const checkStoredCredentials = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { email } = JSON.parse(userData);
        setEmail(email);
      }
    } catch (error) {
      console.error('Error al recuperar credenciales:', error);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(text));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (!isEmailValid) {
      Alert.alert('Error', 'Por favor, ingresa un correo válido.');
      return;
    }

    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        Alert.alert('Error', 'Usuario no encontrado');
        return;
      }

      const userData = JSON.parse(userDataString);

      if (userData.email !== email) {
        Alert.alert('Error', 'Credenciales incorrectas');
        return;
      }

      const hashedInputPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      if (userData.password !== hashedInputPassword) {
        Alert.alert('Error', 'Credenciales incorrectas');
        return;
      }

      await signIn(); // Utilizamos la función signIn del contexto
      Alert.alert('Éxito', 'Inicio de sesión exitoso.');
      router.push('/(main)');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={[styles.input, !isEmailValid && styles.inputError]}
        placeholder="Email Address"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      {!isEmailValid && <Text style={styles.errorText}>Invalid email format</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
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
  inputError: {
    borderColor: 'red', // Cambia el borde a rojo si hay un error
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.035,
    marginBottom: height * 0.01,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: height * 0.015,
    fontSize: width * 0.045,
    color: '#000',
  },
  eyeButton: {
    position: 'absolute',
    right: width * 0.03,
    padding: width * 0.02,
  },
  eyeIcon: {
    fontSize: width * 0.05,
  },
});