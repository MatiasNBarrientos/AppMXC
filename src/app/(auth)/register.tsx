import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Dimensions,Alert,KeyboardAvoidingView,ScrollView,} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useAuth } from '../../utils/context/authcontext';
import { useDynamicStyles} from '@/src/styles/globalStyles';


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
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { signIn } = useAuth();
  const { themeColors: themeColors, ...dynamicStyles } = useDynamicStyles();

  const checkPasswordRequirements = (text: string) => {
    setPasswordRequirements({
      length: text.length >= 8,
      uppercase: /[A-Z]/.test(text),
      number: /[0-9]/.test(text),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(text),
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
        password: hashedPassword,
      };

      if (!signIn) {
        throw new Error('La función signIn no está disponible');
      }

      try {
        // Primero guardar en AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        
        // Luego iniciar sesión
        await signIn(userData);
        
        Alert.alert('Éxito', 'Registro exitoso.');
        router.replace('/(main)'); // Usar replace en lugar de push
      } catch (signInError) {
        console.error('Error durante el inicio de sesión:', signInError);
        // Limpiar storage en caso de error
        await AsyncStorage.multiRemove(['userData', 'isLoggedIn']);
        Alert.alert('Error', 'Hubo un problema al registrar tu cuenta. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudieron guardar los datos del registro.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          dynamicStyles.container,
          { justifyContent: 'center', backgroundColor: themeColors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: themeColors.primary }]}>BIENVENIDO A MxC!</Text>
        <Text style={[styles.subtitle, { color: themeColors.secondary }]}>Crea tu cuenta para empezar</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.secondary, color: themeColors.text }]}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          placeholderTextColor={themeColors.secondary}
        />
        <TextInput
          style={[styles.input, { borderColor: themeColors.secondary, color: themeColors.text }]}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor={themeColors.secondary}
        />
        <TextInput
          style={[styles.input, !isEmailValid && styles.inputError, { borderColor: themeColors.secondary, color: themeColors.text }]}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={themeColors.secondary}
        />
        {!isEmailValid && <Text style={styles.errorText}>Formato de correo inválido</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, { borderColor: themeColors.secondary, color: themeColors.text }]}
            placeholder="Contraseña"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor={themeColors.secondary}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordRequirements}>
          <Text style={[styles.requirement, { color: themeColors.text }, passwordRequirements.length && styles.requirementMet]}>
            • Al menos 8 caracteres
          </Text>
          <Text style={[styles.requirement, { color: themeColors.text }, passwordRequirements.uppercase && styles.requirementMet]}>
            • Una letra mayúscula
          </Text>
          <Text style={[styles.requirement, { color: themeColors.text }, passwordRequirements.number && styles.requirementMet]}>
            • Un número
          </Text>
          <Text style={[styles.requirement, { color: themeColors.text }, passwordRequirements.special && styles.requirementMet]}>
            • Un carácter especial
          </Text>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, { borderColor: themeColors.secondary, color: themeColors.text }]}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            placeholderTextColor={themeColors.secondary}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        {!isPasswordMatch && confirmPassword !== '' && (
          <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
        )}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, { borderColor: themeColors.text }, acceptedTerms && { backgroundColor: themeColors.primary }]}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          />
          <Text style={[styles.checkboxLabel, { color: themeColors.text }]}>
            Acepto los{' '}
            <Text style={[styles.link, { color: themeColors.primary }]} onPress={() => router.push('/terms_agree')}>
              Términos y Condiciones
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, { color: themeColors.background }]}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={[styles.footerText, { color: themeColors.secondary }]}>
            ¿Ya tienes una cuenta? <Text style={styles.footerLink}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.04,
    marginBottom: height * 0.04,
    textAlign: 'center',
  },
  input: {
    width: '98%',
    borderWidth: 1,
    borderRadius: 10,
    padding: height * 0.015,
    marginBottom: height * 0.02,
    fontSize: width * 0.045,
  },
  inputError: {
    borderColor: 'red',
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
    borderRadius: 5,
    marginRight: width * 0.02,
  },
  checkboxChecked: {
    backgroundColor: 'transparent', // Se aplicará el color dinámicamente
  },
  checkboxLabel: {
    fontSize: width * 0.04,
  },
  link: {
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: height * 0.02,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: height * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  passwordInput: {
    flex: 1,
    width: '98%',
    borderWidth: 1,
    borderRadius: 10,
    padding: height * 0.015,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.045,
  },
  eyeButton: {
    position: 'absolute',
    right: width * 0.03,
    padding: width * 0.02,
  },
  eyeIcon: {
    fontSize: width * 0.05,
  },
  passwordRequirements: {
    marginBottom: height * 0.02,
    width: '98%',
  },
  requirement: {
    fontSize: width * 0.035,
    textAlign: 'left',
  },
  requirementMet: {
    color: 'green',
  },
});