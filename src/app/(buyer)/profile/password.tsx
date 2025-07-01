import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { getThemeColors } from '@/src/styles/globalStyles';
import { UserStorage } from '@/src/utils/storage/storage';

export default function ChangePasswordScreen() {
  const colorScheme = useColorScheme();
  const themeColors = getThemeColors(); 
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

  useEffect(() => {
    console.log('Color scheme changed:', colorScheme);
  }, [colorScheme]);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background}]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Cambiar Contraseña</Text>
      
      <View style={[styles.passwordContainer, { borderColor: themeColors.primary }]}>
        <TextInput
          style={[styles.passwordInput, { color: themeColors.text }]}
          placeholder="Contraseña actual"
          placeholderTextColor={themeColors.text + '80'}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          <Text style={[styles.eyeIcon, { color: themeColors.text }]}>
            {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.passwordContainer, { borderColor: themeColors.primary }]}>
        <TextInput
          style={[
            styles.passwordInput, 
            { color: themeColors.text },
            !isPasswordMatch && { borderColor: themeColors.secondary }
          ]}
          placeholder="Nueva contraseña"
          placeholderTextColor={themeColors.text + '80'}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry={!showNewPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Text style={[styles.eyeIcon, { color: themeColors.text }]}>
            {showNewPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.requirementsContainer}>
        {Object.entries(passwordRequirements).map(([key, met]) => (
          <Text 
            key={key}
            style={[
              styles.requirementText,
              { color: met ? themeColors.accent : themeColors.secondary }
            ]}
          >
            • {getRequirementText(key)}
          </Text>
        ))}
      </View>

      <View style={[styles.passwordContainer, { borderColor: themeColors.primary }]}>
        <TextInput
          style={[
            styles.passwordInput,
            { color: themeColors.text },
            !isPasswordMatch && { borderColor: themeColors.secondary }
          ]}
          placeholder="Confirmar nueva contraseña"
          placeholderTextColor={themeColors.text + '80'}
          value={confirmNewPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={[styles.eyeIcon, { color: themeColors.text }]}>
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>

      {!isPasswordMatch && confirmNewPassword !== '' && (
        <Text style={[styles.errorText, { color: themeColors.secondary }]}>
          Las contraseñas no coinciden
        </Text>
      )}

      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: themeColors.primary }
        ]} 
        onPress={handleChangePassword}
      >
        <Text style={[styles.buttonText, { color: themeColors.background }]}>
          Actualizar Contraseña
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeButton: {
    padding: 15,
  },
  eyeIcon: {
    fontSize: 20,
  },
  requirementsContainer: {
    marginVertical: 15,
  },
  requirementText: {
    fontSize: 14,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


const getRequirementText = (key: string) => {
  const texts = {
    length: 'Mínimo 8 caracteres',
    uppercase: 'Al menos una mayúscula',
    number: 'Al menos un número',
    special: 'Al menos un carácter especial'
  };
  return texts[key as keyof typeof texts];
};