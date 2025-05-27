import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { UserStorage } from '@/src/utils/storage/storage'; // Actualizada la ruta de importación
import * as Crypto from 'expo-crypto';

const { width, height } = Dimensions.get('window');

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const router = useRouter();

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

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    checkPasswordRequirements(text);
    setIsPasswordMatch(text === confirmNewPassword);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmNewPassword(text);
    setIsPasswordMatch(newPassword === text);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!Object.values(passwordRequirements).every(Boolean)) {
      Alert.alert('Error', 'La nueva contraseña debe cumplir con todos los requisitos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden.');
      return;
    }

    try {
      const hashedCurrentPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        currentPassword
      );

      const hashedNewPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        newPassword
      );

      const success = await UserStorage.changePassword(hashedCurrentPassword, hashedNewPassword);
      
      if (success) {
        Alert.alert('Éxito', 'Contraseña actualizada correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Error', 'La contraseña actual es incorrecta');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', 'No se pudo actualizar la contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña actual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          <Text style={styles.eyeIcon}>{showCurrentPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, !isPasswordMatch && styles.inputError]}
          placeholder="Nueva contraseña"
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry={!showNewPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Text style={styles.eyeIcon}>{showNewPassword ? '👁️' : '👁️‍🗨️'}</Text>
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
          placeholder="Confirmar nueva contraseña"
          value={confirmNewPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      {!isPasswordMatch && confirmNewPassword !== '' && (
        <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Actualizar Contraseña</Text>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: height * 0.015,
    fontSize: width * 0.045,
    color: '#000',
  },
  eyeButton: {
    padding: 10,
  },
  eyeIcon: {
    fontSize: width * 0.06,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.035,
    marginBottom: height * 0.01,
  },
  requirementsContainer: {
    marginBottom: height * 0.02,
  },
  requirementText: {
    fontSize: width * 0.035,
    marginBottom: height * 0.01,
  },
  requirementMet: {
    color: 'green',
  },
  requirementNotMet: {
    color: 'red',
  },
  button: {
    backgroundColor: '#6A0DAD',
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
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});