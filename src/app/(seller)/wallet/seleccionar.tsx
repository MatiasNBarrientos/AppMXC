import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';

export default function SeleccionarMetodoRetiro() {
  const router = useRouter();
  const dynamicStyles = useDynamicStyles();
  const { amount } = useLocalSearchParams();

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 16, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color={dynamicStyles.themeColors.text} />
      </TouchableOpacity>

        <Text style={[styles.title, { color: dynamicStyles.themeColors.text, marginTop: 16 }]}>
            Selecciona el método de retiro
        </Text>
        <Text style={[styles.amountText, { color: dynamicStyles.themeColors.primary }]}>
            Monto a retirar:
            </Text>
        <Text style={[styles.amount, { color: '#34a853' }]}>
            ${amount}
            </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f7931a' }]}
        onPress={() => router.push({ pathname: '/(seller)/wallet/crypto', params: { amount } })}
      >
        <Ionicons name="logo-bitcoin" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Criptomoneda (Bitcoin, USDT, etc.)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#34a853' }]}
        onPress={() => router.push({ pathname: '/(seller)/wallet/bancaria', params: { amount } })}
      >
        <FontAwesome5 name="university" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Transferencia Bancaria</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#1976d2' }]}
        onPress={() => router.push({ pathname: '/(seller)/wallet/paypal', params: { amount } })}
      >
        <FontAwesome5 name="paypal" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>PayPal</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
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