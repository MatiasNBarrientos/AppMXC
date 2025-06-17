import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useDynamicStyles } from '@/src/styles/globalStyles';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const dynamicStyles = useDynamicStyles();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <Text style={[styles.title, { color: dynamicStyles.themeColors.text }]}>Tu Carrito</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={{ color: dynamicStyles.themeColors.secondary, textAlign: 'center' }}>
            No hay beats en el carrito.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
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
        <View style={styles.footer}>
          <Text style={[styles.total, { color: dynamicStyles.themeColors.text }]}>
            Total: ${totalPrice.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: dynamicStyles.themeColors.primary }]}
            onPress={() => {
              clearCart();
              alert('Compra simulada con éxito 🎧');
            }}
          >
            <Text style={styles.payButtonText}>Pagar</Text>
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
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  payButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});



