import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';

export default function CardFormScreen() {
  const router = useRouter();
  const { themeColors } = useDynamicStyles();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Datos de la tarjeta</Text>

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.secondary }]}
        placeholder="Número de tarjeta"
        placeholderTextColor={themeColors.secondary}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.secondary }]}
        placeholder="Fecha de vencimiento (MM/AA)"
        placeholderTextColor={themeColors.secondary}
        value={expiry}
        onChangeText={setExpiry}
      />

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.secondary }]}
        placeholder="CVV"
        placeholderTextColor={themeColors.secondary}
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={() => router.push('/(buyer)/payment/processing')}
      >
        <Text style={styles.buttonText}>Pagar</Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
