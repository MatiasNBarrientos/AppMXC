import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
  const router = useRouter();
  const dynamicStyles = useDynamicStyles();

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <Ionicons name="checkmark-circle-outline" size={64} color={dynamicStyles.themeColors.primary} style={{ marginBottom: 24 }} />
      <Text style={[styles.title, { color: dynamicStyles.themeColors.primary }]}>
        ¡Solicitud enviada!
      </Text>
      <Text style={[styles.text, { color: dynamicStyles.themeColors.text }]}>
        El procesamiento de tu retiro podría demorar un rato. 
        Agradecemos tu paciencia y gracias por elegirnos.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
        onPress={() => router.replace('/(seller)')}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Volver a mi billetera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
});