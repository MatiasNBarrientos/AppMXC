import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const { themeColors } = useDynamicStyles();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 16, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color={themeColors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: themeColors.text }]}>Selecciona un método de pago</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={() => router.push('/(buyer)/payment/card')}
      >
        <Text style={styles.buttonText}>Tarjeta de crédito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.secondary }]}
        onPress={() => router.push('/(buyer)/payment/processing')}
      >
        <Text style={styles.buttonText}>MercadoPago</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
