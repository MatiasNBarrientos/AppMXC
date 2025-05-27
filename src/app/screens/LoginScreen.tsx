import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


  const validateEmail = (value: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  const handleContinue = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    setError('');
    Alert.alert('Login success', `Welcome: ${email}`);
    // Aquí iría la navegación hacia otra pantalla si existiera
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={[styles.input, errors.password && styles.inputError]}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>I’m a new user: Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Modo oscuro
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
