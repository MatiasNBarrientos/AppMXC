// app/buyer/cart.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';

const CartScreen = () => {
  const { themeColors } = useDynamicStyles();

  // Datos simulados
  const cartItems = [
    { id: '1', title: 'Trap Soul', price: 29.99 },
    { id: '2', title: 'Latino Vibes', price: 34.99 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Tu Carrito</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { borderBottomColor: themeColors.secondary }]}>
            <Text style={[styles.itemText, { color: themeColors.text }]}>{item.title}</Text>
            <Text style={[styles.itemPrice, { color: themeColors.primary }]}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={[styles.totalText, { color: themeColors.text }]}>
          Total: ${total.toFixed(2)}
        </Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]}>
          <Text style={[styles.buttonText, { color: themeColors.background }]}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: moderateScale(12),
  },
  itemText: {
    fontSize: moderateScale(16),
  },
  itemPrice: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: moderateScale(20),
  },
  totalText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginBottom: moderateScale(10),
  },
  button: {
    padding: moderateScale(14),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default CartScreen;
