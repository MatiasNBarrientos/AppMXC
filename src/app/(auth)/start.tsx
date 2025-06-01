import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function StartScreen() {
  const router = useRouter();
  const dynamicStyles = useDynamicStyles();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <Text style={{ textAlign: 'center' }}>Cargando fuente...</Text>;

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <Text style={[styles.title, { fontFamily: 'Poppins_400Regular', color: dynamicStyles.themeColors.primary }]}>
        COMPRA Y VENDE BEATS
      </Text>

      <Image
        source={require('../../assets/record.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: dynamicStyles.themeColors.background,
                fontFamily: 'Poppins_400Regular',
              },
            ]}
          >
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: dynamicStyles.themeColors.secondary }]}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: dynamicStyles.themeColors.background,
                fontFamily: 'Poppins_400Regular',
              },
            ]}
          >
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: verticalScale(30),
    
  },
  image: {
    width: '80%',
    height: verticalScale(220),
    marginBottom: verticalScale(40),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
