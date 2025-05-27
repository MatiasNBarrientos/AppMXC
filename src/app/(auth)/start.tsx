import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useDynamicStyles,getThemeColors } from '@/src/styles/globalStyles';

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const router = useRouter();
  const dynamicStyles = useDynamicStyles(); // Obtiene estilos dinámicos

  return (
    <View style={dynamicStyles.container}>
      <Text style={[dynamicStyles.title, { fontFamily: 'Poppins_400Regular' }]}>
        SELL AND BUY BEATS
      </Text>

      <Image
        source={require('../../assets/record.png')}
        style={dynamicStyles.image}
      />

      <View style={dynamicStyles.buttonContainer}>
        <TouchableOpacity
          style={[dynamicStyles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text style={[dynamicStyles.buttonText, { color: dynamicStyles.themeColors.background }]}>
            Create a new account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[dynamicStyles.button, { backgroundColor: dynamicStyles.themeColors.secondary }]}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={[dynamicStyles.buttonText, { color: dynamicStyles.themeColors.background }]}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

