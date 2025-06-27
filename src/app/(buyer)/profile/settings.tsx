import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { useAuth } from '@/src/utils/context/authcontext';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilSettings = () => {
  const router = useRouter();
  const dynamicStyles = useDynamicStyles();
  const { signOut } = useAuth();
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      await signOut();
      router.push('/(auth)/welcome');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Actualizar las rutas de navegación
  const handleChangePassword = () => {
    router.push('/profile/password');
  };

  return (
    <ScrollView 
      style={[{ flex: 1 }, { backgroundColor: dynamicStyles.themeColors.background }]}
      contentContainerStyle={{ padding: moderateScale(20) }}
    >
      <Text style={[dynamicStyles.title, { marginBottom: verticalScale(20) }]}>
        Configuración
      </Text>

      {/* Sección de Perfil */}
      <View style={styles.section}>
        <Text style={[dynamicStyles.textMedium, { marginBottom: verticalScale(10) }]}>
          Perfil
        </Text>
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={() => router.push('/(main)/profile')}
        >
          <Text style={dynamicStyles.textMedium}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={handleChangePassword}
        >
          <Text style={dynamicStyles.textMedium}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Preferencias */}
      <View style={styles.section}>
        <Text style={[dynamicStyles.textMedium, { marginBottom: verticalScale(10) }]}>
          Preferencias
        </Text>
        <View >
          <Text style={dynamicStyles.textMedium}>Notificaciones</Text>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: '#767577', true: dynamicStyles.themeColors.primary }}
            thumbColor={notificaciones ? dynamicStyles.themeColors.accent : '#f4f3f4'}
          />
        </View>
        <View >
          <Text style={dynamicStyles.textMedium}>Modo Oscuro</Text>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ false: '#767577', true: dynamicStyles.themeColors.primary }}
            thumbColor={modoOscuro ? dynamicStyles.themeColors.accent : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity 
        style={[dynamicStyles.button, { marginTop: verticalScale(30) }]}
        onPress={handleSignOut}
      >
        <Text style={dynamicStyles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  section: {
    marginVertical: verticalScale(15),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  optionButton: {
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' as const,
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
};

export default PerfilSettings;