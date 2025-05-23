import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/context/authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.push('/(auth)');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          }
        }
      ]
    );
  };

  const handleClearData = async () => {
    Alert.alert(
      'Borrar Datos',
      '¿Estás seguro que deseas borrar todos los datos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, borrar todo',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Éxito', 'Todos los datos han sido borrados');
              router.push('/(auth)');
            } catch (error) {
              console.error('Error al borrar los datos:', error);
              Alert.alert('Error', 'No se pudieron borrar los datos');
            }
          }
        }
      ]
    );
  };

  const handleGoToUpload = () => {
    router.push('/upload');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleGoToUpload}>
        <Text style={styles.uploadText}>Subir Beat / Grabación</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutButton, styles.clearDataButton]}
        onPress={handleClearData}
      >
        <Text style={styles.logoutText}>Borrar Datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
  },
  uploadButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearDataButton: {
    backgroundColor: '#b71c1c',
  },
});
