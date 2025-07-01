import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import  imagePath from '@/src/constants/imagePath';
import { Ionicons } from '@expo/vector-icons';
import { getThemeColors, useDynamicStyles } from '@/src/styles/globalStyles';
import { useRouter } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

const languages = [
  { name: 'Spanish', flag: imagePath.es_flag, selected: true },
  { name: 'English', flag: imagePath.en_flag},
];

export default function LanguageSelector() {
  const router = useRouter();
    const { themeColors, ...dynamicStyles } = useDynamicStyles();
    const [selectedLanguage, setSelectedLanguage] = useState('Spanish');

  return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background}]}>
       <View style={[styles.header]}>
        <TouchableOpacity
        style={[dynamicStyles.backButton]}
        onPress={() => router.back()}>
            <View style={[dynamicStyles.circle, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
            </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.title]}>Idiomas</Text>
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.langRow}
          onPress={() => setSelectedLanguage(item.name)}>
            <Image source={item.flag} style={styles.flag} />
            <Text style={styles.langText}>{item.name}</Text>
            {item.name === selectedLanguage && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
      marginBottom: moderateScale(40),
      alignItems:"center",
      flexDirection: 'row',
      justifyContent: "space-evenly",
  },
  headerTitle: {
    flex: 1,
    alignContent:"center",
    marginRight: moderateScale(60),

  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  backArrow: {
    fontSize: 22,
    marginRight: 10,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 16,
  },
  langText: {
    flex: 1,
    fontSize: 16,
  },
  check: {
    fontSize: 18,
    color: '#CE09F7',
    fontWeight: 'bold',
  },
});
