import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { featuredBeats, Beat } from '@/src/constants/beats';

export default function HomeScreen() {
  const dynamicStyles = useDynamicStyles();
  const router = useRouter();

  
  const [balance] = useState(1500.75);

  const renderBeatCard = (beat: Beat) => (
    <TouchableOpacity
      key={beat.id}
      style={[styles.beatCard, { backgroundColor: dynamicStyles.themeColors.background }]}
      onPress={() => router.push({ pathname: '/(seller)/player', params: { id: beat.id } })}
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
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      
      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: dynamicStyles.themeColors.primary }
        ]}
        activeOpacity={0.8}
        onPress={() => { router.push('/(seller)/wallet'); }}
      >
        <Ionicons name="wallet" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>${balance.toFixed(2)}</Text>
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
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
});
