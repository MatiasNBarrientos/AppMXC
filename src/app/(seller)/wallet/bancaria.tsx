import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function RetiroBancario() {
  const { amount } = useLocalSearchParams();
  const dynamicStyles = useDynamicStyles();
  const router = useRouter();

  const [cbu, setCbu] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    if (!cbu || cbu.length < 8) {
      setError('Ingresa un CBU o CVU válido.');
      return;
    }
    setError('');
    Alert.alert(
      'Solicitud enviada',
      `Se ha solicitado el retiro de $${amount} al CBU/CVU:\n${cbu}`,
      [{ text: 'OK', onPress: () => router.replace('/(seller)') }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 16, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color={dynamicStyles.themeColors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: dynamicStyles.themeColors.text }]}>
        Retiro por Transferencia Bancaria
      </Text>
      <Text style={[styles.amount, { color: dynamicStyles.themeColors.primary }]}>
        Monto a retirar: ${amount}
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: dynamicStyles.themeColors.primary, color: dynamicStyles.themeColors.text }
        ]}
        placeholder="CBU/CVU"
        placeholderTextColor={dynamicStyles.themeColors.secondary}
        value={cbu}
        onChangeText={setCbu}
        keyboardType="number-pad"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
        onPress={handleWithdraw}
      >
        <FontAwesome5 name="university" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Solicitar retiro</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});