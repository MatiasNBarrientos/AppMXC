import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import { getThemeColors } from '@/src/styles/globalStyles';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
}

const ChatScreen = () => {
  const router = useRouter();
  const themeColors = getThemeColors();

  const mockChats: ChatItem[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      lastMessage: 'Hola, ¿cómo estás?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      name: 'María García',
      lastMessage: '¿Nos vemos mañana?',
      timestamp: '9:45 AM'
    }
  ];

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      style={[styles.chatItem, { borderBottomColor: themeColors.primary }]}
      
    >
      <View style={styles.chatInfo}>
        <Text style={[styles.name, { color: themeColors.text }]}>{item.name}</Text>
        <Text style={[styles.lastMessage, { color: themeColors.text }]}>{item.lastMessage}</Text>
      </View>
      <Text style={[styles.timestamp, { color: themeColors.secondary }]}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.header, { color: themeColors.text }]}>Chats</Text>
      <FlatList
        data={mockChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    padding: moderateScale(16)
  },
  list: {
    flex: 1
  },
  chatItem: {
    flexDirection: 'row',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatInfo: {
    flex: 1
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(4)
  },
  lastMessage: {
    fontSize: moderateScale(14)
  },
  timestamp: {
    fontSize: moderateScale(12)
  }
});

export default ChatScreen;