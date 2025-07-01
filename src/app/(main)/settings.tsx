import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { useAuth } from '@/src/utils/context/authcontext';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilSettings() {
  const router = useRouter();
  const {themeColors, ...dynamicStyles} = useDynamicStyles();
  const { signOut } = useAuth();
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [biometrico, setBiometrico] = useState(true);
  const [ubicacion, setUbicacion] = useState(true);
  const [dispositivo, setDispositivo] = useState(true);

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
              router.push('/(auth)/welcome'); // Cambiado de /start a /welcome
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          }
        }
      ]
    );
  };

  // Actualizar las rutas de navegación
  const handleChangePassword = () => {
    router.push('/(main)/password');
  };

  return (
    <ScrollView
      style={[{ flex:1, backgroundColor: themeColors.background, marginBottom:moderateScale(40) }]}
      contentContainerStyle={{ padding: moderateScale(20) }}
    >
      <View style={styles.header}>
        <TouchableOpacity
        style={dynamicStyles.backButton}
        onPress={() => router.back()}>
          <View style={[dynamicStyles.circle, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
          </View>
        </TouchableOpacity>
        <Text style={[dynamicStyles.title, { marginBottom: verticalScale(0) }]}>
          Configuración
        </Text>
        <TouchableOpacity
        style={dynamicStyles.backButton}
        onPress={(handleLogout)}>
          <View style={[dynamicStyles.circle, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
            <Ionicons name="exit-outline" size={24} color={themeColors.text} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Sección General */}
      <View style={styles.sectionContent}>
        <Text style={[dynamicStyles.textSection]}>
          Perfil
        </Text>
          <TouchableOpacity style={styles.sectionElement}
            onPress={() => router.push('/(main)/language')}
          >
            <Text style={dynamicStyles.textMedium}>Idioma</Text>
            <Text style={[dynamicStyles.textSection, { marginLeft: "auto", marginRight:moderateScale(16)}]}>Español</Text>
            <Ionicons style={styles.sectionIcon}
            name={"chevron-forward"}
            size={moderateScale(24)}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionElement}
            onPress={() => router.push('/(main)/contact')}
          >
            <Text style={dynamicStyles.textMedium}>Contáctanos</Text>
            <Ionicons style={styles.sectionIcon}
            name={"chevron-forward"}
            size={moderateScale(24)}/>
          </TouchableOpacity>
      </View>

      {/* Sección Preferencias */}
      <View style={styles.sectionContent}>
        <Text style={[dynamicStyles.textSection]}>
          Preferencias
        </Text>
        <View style={styles.sectionElement}>
          <Text style={dynamicStyles.textMedium}>Notificaciones</Text>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: '#767577', true: themeColors.primary }}
            thumbColor={notificaciones ? themeColors.accent : '#f4f3f4'}
          />
        </View>
        <View style={styles.sectionElement}>
          <Text style={dynamicStyles.textMedium}>Modo Oscuro</Text>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ false: '#767577', true: themeColors.primary }}
            thumbColor={modoOscuro ? themeColors.accent : '#f4f3f4'}
          />
        </View>
      </View>

            {/* Sección de Seguridad */}
      <View style={styles.sectionContent}>
        <Text style={[dynamicStyles.textSection]}>
          Seguridad
        </Text>
          <TouchableOpacity style={styles.sectionElement}
            onPress={handleChangePassword}
          >
            <Text style={dynamicStyles.textMedium}>Cambiar Contraseña</Text>
            <Ionicons style={styles.sectionIcon}
            name={"chevron-forward"}
            size={moderateScale(24)}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionElement}
            onPress={() => router.push(('/(auth)/terms_agree'))}
          >
            <Text style={dynamicStyles.textMedium}>Términos y Condiciones</Text>
            <Ionicons style={styles.sectionIcon}
            name={"chevron-forward"}
            size={moderateScale(24)}/>
          </TouchableOpacity>
      </View>

      {/* Sección Data */}
      <View style={styles.sectionContent}>
        <Text style={dynamicStyles.textSection}>Datos a compartir con nosotros</Text>
        <View style={styles.sectionElement}>
          <Text style={dynamicStyles.textMedium}>Biométricos</Text>
          <Switch
            value={biometrico}
            onValueChange={setBiometrico}
            trackColor={{ false: '#767577', true: themeColors.primary }}
            thumbColor={biometrico ? themeColors.accent : '#f4f3f4'}
          />
        </View>
        <View style={styles.sectionElement}>
          <Text style={dynamicStyles.textMedium}>Ubicación</Text>
          <Switch
            value={ubicacion}
            onValueChange={setUbicacion}
            trackColor={{ false: '#767577', true: themeColors.primary }}
            thumbColor={ubicacion ? themeColors.accent : '#f4f3f4'}
          />
        </View>
        <View style={styles.sectionElement}>
          <Text style={dynamicStyles.textMedium}>Dispositivo</Text>
          <Switch
            value={dispositivo}
            onValueChange={setDispositivo}
            trackColor={{ false: '#767577', true: themeColors.primary }}
            thumbColor={dispositivo ? themeColors.accent : '#f4f3f4'}
          />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerIcon: {
    borderRadius: moderateScale(32),
    backgroundColor: "whitesmoke",

  },

  sectionContent: {
    marginVertical: verticalScale(1),
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(15),
    borderRadius: moderateScale(10),
    //backgroundColor: 'rgba(255, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  sectionElement: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    //backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  sectionIcon: {
    padding: moderateScale(10)

  }
});

// export default PerfilSettings;
