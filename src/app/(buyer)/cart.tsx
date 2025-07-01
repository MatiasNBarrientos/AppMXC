import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Agrega este import

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();
  const dynamicStyles = useDynamicStyles();
  const router = useRouter();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      {/* Flecha para volver */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 48, left: 16, zIndex: 10 }}
        onPress={() => router.replace('/(buyer)')}
        >
        <Ionicons name="arrow-back" size={28} color={dynamicStyles.themeColors.text} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: dynamicStyles.themeColors.text, marginTop: 16 }]}>Tu Carrito</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={{ color: dynamicStyles.themeColors.secondary, textAlign: 'center' }}>
            No hay beats en el carrito.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: dynamicStyles.themeColors.background2 }]}>
            <Text style={[styles.itemText, { color: dynamicStyles.themeColors.text }]}>
              {item.title} x{item.quantity}
            </Text>
            <Text style={[styles.itemText, { color: dynamicStyles.themeColors.text }]}>
              ${item.price * item.quantity}
            </Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={{ color: 'red' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {cartItems.length > 0 && (
        <View style={[styles.footer, { backgroundColor: dynamicStyles.themeColors.background }]}>
          <Text style={[styles.total, { color: dynamicStyles.themeColors.text }]}>
            Total: ${totalPrice.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: dynamicStyles.themeColors.primary }]}
            onPress={() => router.push('/(buyer)/payment')}
          >
            <Text style={styles.payButtonText}>Finalizar compra</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  footer: {
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16,
    marginRight: 16,
    marginTop: 8,
  },
  payButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
