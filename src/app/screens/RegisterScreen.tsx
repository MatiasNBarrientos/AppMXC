// src/app/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const validateEmail = (value: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  const handleRegister = async () => {
    let newErrors: typeof errors = {};

    if (!email) newErrors.email = 'El correo es obligatorio';
    else if (!validateEmail(email)) newErrors.email = 'Formato de correo inválido';

    if (!password) newErrors.password = 'La contraseña es obligatoria';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    if (confirmPassword !== password) newErrors.confirmPassword = 'Las contraseñas no coinciden';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simula un registro exitoso y guarda la sesión
        await AsyncStorage.setItem('userSession', JSON.stringify({ email }));
        Alert.alert('Registro exitoso', `¡Bienvenido/a ${email}!`);

        navigation.replace('MainApp'); // Redirige a la pantalla principal
      } catch (error) {
        console.error('Error al guardar la sesión', error);
        Alert.alert('Error', 'Ocurrió un problema al registrar');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={[styles.input, errors.password && styles.inputError]}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUpText}>Ya tengo una cuenta: Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputError: {
    borderColor: '#ff4d4d',
  },
  errorText: {
    color: '#ff4d4d',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#a259ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signUpText: {
    color: '#aaa',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
