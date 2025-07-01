import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { themeColors } = useDynamicStyles();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>¡Pago exitoso! 🎉</Text>
      <Text style={[styles.message, { color: themeColors.secondary }]}>
        Gracias por tu compra. Te enviaremos un correo con los detalles.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
