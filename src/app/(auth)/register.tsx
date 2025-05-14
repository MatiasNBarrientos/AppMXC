import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useAuth } from '../../utils/context/authcontext';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(text));
  };

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  const checkPasswordRequirements = (text: string) => {
    setPasswordRequirements({
      length: text.length >= 8,
      uppercase: /[A-Z]/.test(text),
      number: /[0-9]/.test(text),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(text)
    });
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsPasswordMatch(text === confirmPassword);
    checkPasswordRequirements(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setIsPasswordMatch(password === text);
  };

  const handleRegister = async () => {
    if (!nombre || !username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (!isEmailValid) {
      Alert.alert('Error', 'Por favor, ingresa un correo válido.');
      return;
    }
    
    // Verificación adicional de requisitos de contraseña
    if (!Object.values(passwordRequirements).every(Boolean)) {
      Alert.alert('Error', 'La contraseña debe cumplir con todos los requisitos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones para registrarte.');
      return;
    }

    try {
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      const userData = {
        nombre,
        username,
        email,
        password: hashedPassword
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      try {
        await signIn(); // Asegúrate de manejar cualquier error que pueda ocurrir aquí
        Alert.alert('Éxito', 'Registro exitoso.');
        router.push('/(main)');
      } catch (signInError) {
        console.error('Error durante el inicio de sesión:', signInError);
        Alert.alert('Error', 'Registro exitoso pero hubo un problema al iniciar sesión automáticamente.');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudieron guardar los datos del registro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
          style={[styles.passwordInput, !isPasswordMatch && styles.inputError]}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.requirementsContainer}>
        <Text style={[
          styles.requirementText,
          passwordRequirements.length ? styles.requirementMet : styles.requirementNotMet
        ]}>• Mínimo 8 caracteres</Text>
        <Text style={[
          styles.requirementText,
          passwordRequirements.uppercase ? styles.requirementMet : styles.requirementNotMet
        ]}>• Al menos una mayúscula</Text>
        <Text style={[
          styles.requirementText,
          passwordRequirements.number ? styles.requirementMet : styles.requirementNotMet
        ]}>• Al menos un número</Text>
        <Text style={[
          styles.requirementText,
          passwordRequirements.special ? styles.requirementMet : styles.requirementNotMet
        ]}>• Al menos un carácter especial</Text>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, !isPasswordMatch && styles.inputError]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      {!isPasswordMatch && confirmPassword !== '' && (
        <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
      )}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        />
        <Text style={styles.checkboxLabel}>
          I accept the <Text style={styles.link}>Terms and Conditions</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerLink}>Sign In</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  checkbox: {
    width: width * 0.05,
    height: width * 0.05,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: width * 0.02,
  },
  checkboxChecked: {
    backgroundColor: '#6A0DAD',
  },
  checkboxLabel: {
    fontSize: width * 0.04,
    color: '#000',
  },
  link: {
    color: '#6A0DAD',
    fontWeight: 'bold',
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
  requirementsContainer: {
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  requirementText: {
    fontSize: width * 0.035,
    marginBottom: 5,
  },
  requirementMet: {
    color: '#4CAF50', // Color verde para requisitos cumplidos
  },
  requirementNotMet: {
    color: '#FF5252', // Color rojo para requisitos no cumplidos
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