import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';

interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: string;
  image: any;
  price: number;
}

const featuredBeats: Beat[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    producer: 'DJ Fresh',
    genre: 'Pop',
    image: require('@/src/assets/images/placeholder.png'),
    price: 29.99
  },
  // Añade más beats aquí
];

export default function HomeScreen() {
  const dynamicStyles = useDynamicStyles();

  const renderBeatCard = (beat: Beat) => (
    <TouchableOpacity 
      key={beat.id}
      style={[styles.beatCard, { backgroundColor: dynamicStyles.themeColors.background }]}
    >
      <Image source={beat.image} style={styles.beatImage} />
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
          <TouchableOpacity style={styles.playButton}>
            <Ionicons 
              name="play" 
              size={24} 
              color={dynamicStyles.themeColors.primary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
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

        {/* Más secciones aquí */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: moderateScale(200),
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
  playButton: {
    padding: moderateScale(5),
  },
});