import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';

function luhnCheck(card: string) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = card.length - 1; i >= 0; i--) {
    let digit = parseInt(card[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export default function CardFormScreen() {
  const router = useRouter();
  const { themeColors } = useDynamicStyles();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const validateCard = () => {
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleanCard)) {
      setError('El número de tarjeta debe tener 16 dígitos.');
      return false;
    }
    if (!luhnCheck(cleanCard)) {
      setError('El número de tarjeta no es válido.');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError('La fecha debe tener formato MM/AA.');
      return false;
    }
    const [mm, yy] = expiry.split('/').map(Number);
    if (mm < 1 || mm > 12) {
      setError('El mes de vencimiento no es válido.');
      return false;
    }
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      setError('La tarjeta está vencida.');
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setError('El CVV debe tener 3');
      return false;
    }
    setError('');
    return true;
  };

  const handlePay = () => {
    if (validateCard()) {
      setError('');
      router.push('/(buyer)/payment/processing');
    }
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(text);
    if (text.replace(/\s+/g, '').length === 16) {
      const cleanCard = text.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(cleanCard)) {
        setError('El número de tarjeta debe tener 16 dígitos.');
      } else if (!luhnCheck(cleanCard)) {
        setError('El número de tarjeta no es válido.');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };
  const handleExpiryChange = (text: string) => {
    setExpiry(text);
    if (text.length === 5) {
      if (!/^\d{2}\/\d{2}$/.test(text)) {
        setError('La fecha debe tener formato MM/AA.');
      } else {
        const [mm, yy] = text.split('/').map(Number);
        if (mm < 1 || mm > 12) {
          setError('El mes de vencimiento no es válido.');
        } else {
          const now = new Date();
          const currentYear = now.getFullYear() % 100;
          const currentMonth = now.getMonth() + 1;
          if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
            setError('La tarjeta está vencida.');
          } else {
            setError('');
          }
        }
      }
    } else {
      setError('');
    }
  };
  const handleCvvChange = (text: string) => {
    setCvv(text);
    if (text.length === 3 || text.length === 4) {
      if (!/^\d{3,4}$/.test(text)) {
        setError('El CVV debe tener 3 o 4 dígitos.');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 16, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color={themeColors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: themeColors.text }]}>Datos de la tarjeta</Text>

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.secondary }]}
        placeholder="Número de tarjeta"
        placeholderTextColor={themeColors.secondary}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={19}
      />

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.secondary }]}
        placeholder="Fecha de vencimiento (MM/AA)"
        placeholderTextColor={themeColors.secondary}
        value={expiry}
        onChangeText={handleExpiryChange}
        maxLength={5}
      />

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.secondary }]}
        placeholder="CVV"
        placeholderTextColor={themeColors.secondary}
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={handleCvvChange}
        maxLength={4}
      />

      {error ? (
        <Text style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{error}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={handlePay}
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
