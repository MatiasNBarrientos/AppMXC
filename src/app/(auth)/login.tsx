import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../utils/context/authcontext';
import { useDynamicStyles,getThemeColors } from '@/src/styles/globalStyles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();
  const dynamicStyles = useDynamicStyles();

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
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('userRole', userData.role); //Se guarda el rol
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await signIn(userData);

      Alert.alert('Éxito', 'Registro exitoso.');

      if (userData.role === 'buyer') {
        router.replace('/(buyer)');
      } else if (userData.role === 'seller') {
        router.replace('/(seller)');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión.');
    }
  };

  return (
    <View style={[dynamicStyles.container, dynamicStyles.loginContainer]}>
      <Text style={[dynamicStyles.title, dynamicStyles.loginTitle]}>
        BIENVENIDO DE VUELTA!
      </Text>
      <Text style={[dynamicStyles.description, dynamicStyles.loginSubtitle]}>
        Inicia sesión para continuar
      </Text>
      
      <TextInput
        style={[
          dynamicStyles.input,
          !isEmailValid && dynamicStyles.inputError,
          { color: dynamicStyles.themeColors.text }
        ]}
        placeholder="Correo electrónico"
        placeholderTextColor={dynamicStyles.themeColors.secondary}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {!isEmailValid && (
        <Text style={[dynamicStyles.errorText, { color: 'red' }]}>
          Formato de correo inválido
        </Text>
      )}
      
      <View style={dynamicStyles.passwordContainer}>
        <TextInput
          style={[
            dynamicStyles.input,
            { color: dynamicStyles.themeColors.text }
          ]}
          placeholder="Contraseña"
          placeholderTextColor={dynamicStyles.themeColors.secondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        
        <TouchableOpacity
          style={dynamicStyles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={[dynamicStyles.showPasswordIcon, { color: dynamicStyles.themeColors.text }]}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[dynamicStyles.button, { marginTop: verticalScale(20) }]}
        onPress={handleLogin}
      >
        <Text style={dynamicStyles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={[dynamicStyles.textCenter, { marginTop: verticalScale(15) }]}>
          ¿No tienes una cuenta?{' '}
          <Text style={dynamicStyles.link}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}