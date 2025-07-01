import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/utils/context/authcontext';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileImageType {
  uri: string | null;
}

interface UserData {
  nombre: string;
  email: string;
  username: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const dynamicStyles = useDynamicStyles();
  const [profileImage, setProfileImage] = useState<ProfileImageType>({ uri: null });
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  };

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Error', 'Necesitamos permiso para acceder a tus fotos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const newImageUri = result.assets[0].uri;
        setProfileImage({ uri: newImageUri });

        try {
          await AsyncStorage.setItem('profileImage', newImageUri);
        } catch (error) {
          console.error('Error al guardar la imagen:', error);
        }
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };


  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setProfileImage({ uri: savedImageUri });
        }
      } catch (error) {
        console.error('Error al cargar la imagen del perfil:', error);
      }
    };

    loadProfileImage();
  }, []);

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
              router.push('/(auth)/welcome');  
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: dynamicStyles.themeColors.text }]}>Mi Perfil</Text>
        <TouchableOpacity 
          onPress={() => router.push('/profile/settings')}
          style={styles.settingsButton}
        >
          <Ionicons 
            name="settings-outline" 
            size={24} 
            color={dynamicStyles.themeColors.text} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContent}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
          {profileImage.uri ? (
            <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, { backgroundColor: dynamicStyles.themeColors.background2 }]}>
              <Ionicons name="person" size={50} color={dynamicStyles.themeColors.secondary} />
            </View>
          )}
          <View style={styles.editBadge}>
            <View style={[styles.editBadgeInner, { backgroundColor: dynamicStyles.themeColors.primary }]}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: dynamicStyles.themeColors.text }]}>
            {userData?.username || 'Nombre de Usuario'}
          </Text>
          <Text style={[styles.email, { color: dynamicStyles.themeColors.secondary }]}>
            {userData?.email || 'email@ejemplo.com'}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(90),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: moderateScale(10),
  },
  profileContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  imageContainer: {
    position: 'relative',
    marginBottom: moderateScale(20),
  },
  profileImage: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  editBadgeInner: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  name: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
  },
  email: {
    fontSize: moderateScale(16),
  },
  button: {
    margin: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});