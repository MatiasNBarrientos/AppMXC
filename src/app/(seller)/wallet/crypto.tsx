import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function RetiroCrypto() {
  const { amount } = useLocalSearchParams();
  const dynamicStyles = useDynamicStyles();
  const router = useRouter();

  const [wallet, setWallet] = useState('');
  const [cryptoType, setCryptoType] = useState<'BTC' | 'USDT'>('BTC');
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    if (!wallet || wallet.length < 8) {
      setError('Ingresa una dirección de wallet válida.');
      return;
    }
    setError('');
    Alert.alert(
      'Solicitud enviada',
      `Se ha solicitado el retiro de $${amount} en ${cryptoType} a la wallet:\n${wallet}`,
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
        Retiro por Criptomoneda
      </Text>
      <Text style={[styles.amount, { color: dynamicStyles.themeColors.primary }]}>
        Monto a retirar: ${amount}
      </Text>

      <View style={styles.cryptoSelector}>
        <TouchableOpacity
          style={[
            styles.cryptoButton,
            cryptoType === 'BTC' && { backgroundColor: '#f7931a' }
          ]}
          onPress={() => setCryptoType('BTC')}
        >
          <FontAwesome5 name="bitcoin" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.cryptoText}>BTC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cryptoButton,
            cryptoType === 'USDT' && { backgroundColor: '#26a17b' }
          ]}
          onPress={() => setCryptoType('USDT')}
        >
          <FontAwesome5 name="dollar-sign" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.cryptoText}>USDT</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          { borderColor: dynamicStyles.themeColors.primary, color: dynamicStyles.themeColors.text }
        ]}
        placeholder={`Dirección de wallet ${cryptoType}`}
        placeholderTextColor={dynamicStyles.themeColors.secondary}
        value={wallet}
        onChangeText={setWallet}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
        onPress={handleWithdraw}
      >
        <Ionicons name="arrow-forward" size={22} color="#fff" style={{ marginRight: 8 }} />
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
  cryptoSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    width: '100%',
  },
  cryptoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bbb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cryptoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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