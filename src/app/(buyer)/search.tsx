import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { getThemeColors } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';

interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: string;
  bpm: number;
  price: number;
  likes: number;
  plays: number;
}

const SearchScreen = () => {
  const themeColors = getThemeColors();
  const [searchQuery, setSearchQuery] = useState('');

  const mockBeats: Beat[] = [
    {
      id: '1',
      title: 'Trap Soul',
      producer: 'BeatMaker Pro',
      genre: 'Trap',
      bpm: 140,
      price: 29.99,
      likes: 156,
      plays: 1234
    },
    {
      id: '2',
      title: 'Latino Vibes',
      producer: 'DJ Latino',
      genre: 'Reggaeton',
      bpm: 95,
      price: 34.99,
      likes: 89,
      plays: 567
    }
  ];

  const renderBeat = ({ item }: { item: Beat }) => (
    <TouchableOpacity style={[styles.beatCard, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <View style={styles.beatInfo}>
          <Text style={[styles.beatTitle, { color: themeColors.text }]}>{item.title}</Text>
          <Text style={[styles.producerName, { color: themeColors.secondary }]}>{item.producer}</Text>
        </View>
        <View style={styles.priceTag}>
          <Text style={[styles.price, { color: themeColors.accent }]}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.beatDetails}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: themeColors.secondary }]}>Género:</Text>
          <Text style={[styles.detailValue, { color: themeColors.text }]}>{item.genre}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: themeColors.secondary }]}>BPM:</Text>
          <Text style={[styles.detailValue, { color: themeColors.text }]}>{item.bpm}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.stats}>
          <Ionicons name="heart-outline" size={20} color={themeColors.text} />
          <Text style={[styles.statText, { color: themeColors.text }]}>{item.likes}</Text>
        </View>
        <View style={styles.stats}>
          <Ionicons name="play-outline" size={20} color={themeColors.text} />
          <Text style={[styles.statText, { color: themeColors.text }]}>{item.plays}</Text>
        </View>
        <TouchableOpacity style={[styles.playButton, { backgroundColor: themeColors.primary }]}>
          <Ionicons name="play" size={24} color={themeColors.background} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={themeColors.secondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Buscar beats..."
          placeholderTextColor={themeColors.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={mockBeats}
        renderItem={renderBeat}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScale(16)
  },
  searchIcon: {
    marginRight: moderateScale(10)
  },
  searchInput: {
    flex: 1,
    height: moderateScale(40),
    fontSize: moderateScale(16),
    padding: moderateScale(8)
  },
  list: {
    flex: 1
  },
  listContent: {
    padding: moderateScale(10)
  },
  beatCard: {
    marginBottom: moderateScale(15),
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(10)
  },
  beatInfo: {
    flex: 1
  },
  beatTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold'
  },
  producerName: {
    fontSize: moderateScale(14)
  },
  priceTag: {
    padding: moderateScale(5)
  },
  price: {
    fontSize: moderateScale(18),
    fontWeight: 'bold'
  },
  beatDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(15)
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailLabel: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(5)
  },
  detailValue: {
    fontSize: moderateScale(14),
    fontWeight: '500'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: moderateScale(10)
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statText: {
    marginLeft: moderateScale(5),
    fontSize: moderateScale(14)
  },
  playButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SearchScreen;