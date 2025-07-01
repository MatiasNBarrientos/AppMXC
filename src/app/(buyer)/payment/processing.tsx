import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { useCart } from '@/src/context/CartContext';

export default function ProcessingPaymentScreen() {
  const router = useRouter();
  const { themeColors } = useDynamicStyles();
  const { clearCart } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearCart();
      router.replace('/(buyer)/payment/success');
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.text, { color: themeColors.text }]}>Procesando pago...</Text>
      <ActivityIndicator size="large" color={themeColors.primary} style={{ marginTop: 20 }} />
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
