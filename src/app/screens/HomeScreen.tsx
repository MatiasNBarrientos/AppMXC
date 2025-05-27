import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error cerrando sesión:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola 👋</Text>
        <Text style={styles.username}>¡Bienvenido a BeatApp!</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="#ff4d4d" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buscar Beats</Text>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={32} color="#a259ff" />
          <Text style={styles.cardText}>Explorar música</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vender Beats</Text>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Upload')}>
          <MaterialIcons name="upload" size={32} color="#1DB954" />
          <Text style={styles.cardText}>Publicar tu beat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Trap', 'Lo-fi', 'Drill', 'Pop', 'Reggaeton'].map((genre, idx) => (
            <View key={idx} style={styles.genreCard}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    color: '#aaa',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginLeft: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  genreCard: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  genreText: {
    color: '#fff',
    fontWeight: '600',
  },
});
