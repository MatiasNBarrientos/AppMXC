import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext'; 
import { featuredBeats, Beat } from '@/src/constants/beats';
import { router } from 'expo-router';



export default function HomeScreen() {
  const dynamicStyles = useDynamicStyles();
  const { addToCart, cartItems } = useCart();

  const getQuantity = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const renderBeatCard = (beat: Beat) => (
    <TouchableOpacity
      key={beat.id}
      style={[styles.beatCard, { backgroundColor: dynamicStyles.themeColors.background }]}
      onPress={() => router.push({ pathname: '/(buyer)/player', params: { id: beat.id } })}
    >
      <Image source={beat.image} style={styles.beatImage} />
      
      {getQuantity(beat.id) > 0 && (
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>{getQuantity(beat.id)}</Text>
        </View>
      )}

      <View style={styles.beatInfo}>
        <Text style={[styles.beatTitle, { color: dynamicStyles.themeColors.text }]}>
          {beat.title}
        </Text>
        <Text style={[styles.beatProducer, { color: dynamicStyles.themeColors.secondary }]}>
          {beat.producer}
        </Text>
        <View style={styles.beatFooter}>
          <Text style={[styles.beatPrice, { color: dynamicStyles.themeColors.primary }]}>
            ${beat.price}
          </Text>

              <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => addToCart({ id: beat.id, title: beat.title, price: beat.price })}
              >
                <Ionicons 
                  name="cart-outline" 
                  size={24} 
                  color={dynamicStyles.themeColors.primary} 
                />
              </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: dynamicStyles.themeColors.background }]}
        onPress={() => router.push('/(buyer)/cart')}
        activeOpacity={0.8}
      >
        <Ionicons name="cart-outline" size={28} color="#fff" />
        {totalQuantity > 0 && (
          <View style={styles.fabBadge}>
            <Text style={styles.fabBadgeText}>{totalQuantity}</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: dynamicStyles.themeColors.text }]}>
            Descubre
          </Text>
          <Text style={[styles.subtitle, { color: dynamicStyles.themeColors.secondary }]}>
            Los mejores beats para tu próximo hit
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: dynamicStyles.themeColors.text }]}>
            Destacados
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.beatsList}
          >
            {featuredBeats.map(renderBeatCard)}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    quantityBadge: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    backgroundColor: 'red',
    borderRadius: moderateScale(12),
    width: moderateScale(24),
    height: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  quantityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },

  container: {
    flex: 1,
  },
  header: {
    padding: moderateScale(20),
    paddingTop: verticalScale(50),
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  subtitle: {
    fontSize: moderateScale(16),
  },
  section: {
    marginTop: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(20),
  },
  beatsList: {
    paddingHorizontal: moderateScale(20),
  },
  beatCard: {
    width: moderateScale(160),
    marginRight: moderateScale(15),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  beatImage: {
    width: '100%',
    height: moderateScale(200),
    resizeMode: 'cover',
  },
  beatInfo: {
    padding: moderateScale(10),
  },
  beatTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  beatProducer: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(10),
  },
  beatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  beatPrice: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  cartButton: {
    padding: moderateScale(5),
  },
  fab: {
    position: 'absolute',
    top: moderateScale(40),
    right: moderateScale(24),
    zIndex: 100,
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(10), // Puedes dejarlo pequeño para esquinas levemente redondeadas, o poner 0 para cuadrado puro
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: undefined, // El color se aplica desde el componente
  },
  fabBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  fabBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
