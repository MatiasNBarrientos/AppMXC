import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useAuth } from '../../utils/context/authcontext';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const router = useRouter();
  const { signIn } = useAuth();
  const { themeColors, ...dynamicStyles } = useDynamicStyles();

  useEffect(() => {
    const createDefaultUsers = async () => {
      const buyerKey = 'comprador@admin.com';
      const sellerKey = 'vendedor@admin.com';
      const defaultPassword = 'Admin135#';
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        defaultPassword
      );

      const buyerExists = await AsyncStorage.getItem(buyerKey);
      if (!buyerExists) {
        await AsyncStorage.setItem(
          buyerKey,
          JSON.stringify({
            nombre: 'Comprador Admin',
            username: 'comprador',
            email: buyerKey,
            password: hashedPassword,
            role: 'buyer',
          })
        );
      }

      const sellerExists = await AsyncStorage.getItem(sellerKey);
      if (!sellerExists) {
        await AsyncStorage.setItem(
          sellerKey,
          JSON.stringify({
            nombre: 'Vendedor Admin',
            username: 'vendedor',
            email: sellerKey,
            password: hashedPassword,
            role: 'seller',
          })
        );
      }
    };

    createDefaultUsers();
  }, []);

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
    if (!role) {
      Alert.alert('Error', 'Por favor, seleccioná un rol: comprador o vendedor.');
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
        role,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('userRole', userData.role);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('logueadoAnteriormente', 'true');
      await signIn(userData);

      Alert.alert('Éxito', 'Registro exitoso.');

      if (userData.role === 'buyer') {
        router.replace('/(buyer)');
      } else {
        router.replace('/(seller)');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      await AsyncStorage.multiRemove(['userData', 'isLoggedIn']);
      Alert.alert('Error', 'Hubo un problema al registrar tu cuenta.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          backgroundColor: themeColors.background,
        }}
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
          style={[
            styles.input,
            !isEmailValid && styles.inputError,
            { borderColor: themeColors.secondary, color: themeColors.text },
          ]}
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

        <Text style={[styles.subtitle, { color: themeColors.secondary }]}>Seleccioná tu rol:</Text>
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              {
                borderColor: role === 'buyer' ? themeColors.primary : themeColors.secondary,
                backgroundColor: role === 'buyer' ? themeColors.primary + '20' : 'transparent',
              },
            ]}
            onPress={() => setRole('buyer')}
          >
            <Text
              style={{
                color: role === 'buyer' ? themeColors.primary : themeColors.text,
                fontWeight: '600',
                fontSize: moderateScale(14),
              }}
            >
              Comprador
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              {
                borderColor: role === 'seller' ? themeColors.primary : themeColors.secondary,
                backgroundColor: role === 'seller' ? themeColors.primary + '20' : 'transparent',
              },
            ]}
            onPress={() => setRole('seller')}
          >
            <Text
              style={{
                color: role === 'seller' ? themeColors.primary : themeColors.text,
                fontWeight: '600',
                fontSize: moderateScale(14),
              }}
            >
              Vendedor
            </Text>
          </TouchableOpacity>
        </View>

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
          <Text style={[styles.requirement, passwordRequirements.length && styles.requirementMet]}>• Al menos 8 caracteres</Text>
          <Text style={[styles.requirement, passwordRequirements.uppercase && styles.requirementMet]}>• Una letra mayúscula</Text>
          <Text style={[styles.requirement, passwordRequirements.number && styles.requirementMet]}>• Un número</Text>
          <Text style={[styles.requirement, passwordRequirements.special && styles.requirementMet]}>• Un carácter especial</Text>
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
            style={[
              styles.checkbox,
              { borderColor: themeColors.text },
              acceptedTerms && {
                backgroundColor: themeColors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            {acceptedTerms && <Text style={{ color: '#fff', fontSize: moderateScale(14) }}>✔️</Text>}
          </TouchableOpacity>
          <Text style={[styles.checkboxLabel, { color: themeColors.text }]}>
            Acepto los{' '}
            <Text style={[styles.link, { color: themeColors.primary }]} onPress={() => router.push('/terms_agree')}>
              Términos y Condiciones
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={handleRegister}>
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
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(15),
    fontSize: moderateScale(14),
    alignSelf: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(13),
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
    width: '90%',
    alignSelf: 'center',
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    marginHorizontal: scale(10),
    alignItems: 'center',
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    alignSelf: 'center',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    fontSize: moderateScale(14),
  },
  eyeButton: {
    position: 'absolute',
    right: scale(10),
    padding: scale(8),
  },
  eyeIcon: {
    fontSize: moderateScale(16),
  },
  passwordRequirements: {
    marginBottom: verticalScale(15),
    width: '90%',
    alignSelf: 'center',
  },
  requirement: {
    fontSize: moderateScale(13),
    textAlign: 'left',
  },
  requirementMet: {
    color: 'green',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderRadius: scale(5),
    marginRight: scale(10),
  },
  checkboxLabel: {
    fontSize: moderateScale(14),
    flexShrink: 1,
  },
  link: {
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    marginTop: verticalScale(7),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: verticalScale(7),
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: 'bold',
  },
});
