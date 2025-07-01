import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';

export default function WalletScreen() {
  const router = useRouter();
  const dynamicStyles = useDynamicStyles();

  // Simulación de balance (puedes traerlo de contexto o props)
  const [balance] = useState(1500.75);
  const [amount, setAmount] = useState('');
  const [errorType, setErrorType] = useState<'none' | 'insufficient' | 'invalid'>('none');
  const [pressed, setPressed] = useState(false);

  const withdrawAmount = parseFloat(amount);
  const isInvalidAmount = !amount || isNaN(withdrawAmount) || withdrawAmount <= 0;
  const insufficientFunds = !isInvalidAmount && withdrawAmount > balance;

  const handleWithdraw = () => {
    setPressed(true);
    if (isInvalidAmount) {
      setErrorType('invalid');
      Vibration.vibrate(200);
      return;
    }
    if (insufficientFunds) {
      setErrorType('insufficient');
      Vibration.vibrate(200);
      return;
    }
    setErrorType('none');
    setPressed(false);
    router.push({ pathname: '/(seller)/wallet/seleccionar', params: { amount: withdrawAmount } });
  };

  const getButtonStyle = () => {
    if ((errorType === 'insufficient' || errorType === 'invalid') && pressed) {
      return { backgroundColor: '#d32f2f', borderWidth: 2, borderColor: '#b71c1c' };
    }
    return { backgroundColor: dynamicStyles.themeColors.primary };
  };

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 16, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color={dynamicStyles.themeColors.text} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: dynamicStyles.themeColors.text, marginTop: 16 }]}>
        Retirar dinero
      </Text>
      <Text style={[styles.balance, { color: dynamicStyles.themeColors.primary }]}>
        Saldo disponible: ${balance.toFixed(2)}
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: dynamicStyles.themeColors.primary, color: dynamicStyles.themeColors.text }
        ]}
        placeholder="Monto a retirar"
        placeholderTextColor={dynamicStyles.themeColors.secondary}
        keyboardType="numeric"
        value={amount}
        onChangeText={text => {
          setAmount(text);
          setErrorType('none');
          setPressed(false);
        }}
      />
      {(!isInvalidAmount && insufficientFunds) && (
        <Text style={{ color: 'red', marginBottom: 12 }}>
          Tu saldo es insuficiente para ese retiro.
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, getButtonStyle()]}
        onPress={handleWithdraw}
        activeOpacity={0.8}
      >
        {(errorType === 'insufficient' || errorType === 'invalid') && pressed ? (
          <Ionicons name="close" size={24} color="#fff" style={{ marginRight: 8 }} />
        ) : (
          <Ionicons name="arrow-forward" size={24} color="#fff" style={{ marginRight: 8 }} />
        )}
        <Text style={styles.buttonText}>Elegir método de retiro</Text>
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
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 8,
    backgroundColor: 'transparent',
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
