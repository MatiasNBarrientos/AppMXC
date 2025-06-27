// app/buyer/history.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { moderateScale } from 'react-native-size-matters';

const HistoryScreen = () => {
  const { themeColors } = useDynamicStyles();

  const purchaseHistory = [
    { id: '1', title: 'Trap Soul', date: '2024-04-10', price: 29.99 },
    { id: '2', title: 'Boom Bap Classic', date: '2024-04-03', price: 24.99 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Historial de Compras</Text>

      <FlatList
        data={purchaseHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { borderBottomColor: themeColors.secondary }]}>
            <Text style={[styles.itemTitle, { color: themeColors.text }]}>{item.title}</Text>
            <Text style={[styles.itemDate, { color: themeColors.secondary }]}>{item.date}</Text>
            <Text style={[styles.itemPrice, { color: themeColors.primary }]}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
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
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  itemDate: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(4),
  },
  itemPrice: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(4),
  },
});

export default HistoryScreen;
