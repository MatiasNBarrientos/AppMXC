import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function UploadScreen() {
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true,
      multiple: false
    });

    if (result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !genre || !description) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const beatData = {
      title,
      genre,
      description,
      fileName: file.name,
      fileUri: file.uri
    };

    try {
      const existing = await AsyncStorage.getItem('beats');
      const beats = existing ? JSON.parse(existing) : [];
      beats.push(beatData);
      await AsyncStorage.setItem('beats', JSON.stringify(beats));

      Alert.alert('Éxito', 'Beat subido correctamente.');
      router.push('/(main)');
    } catch (error) {
      console.error('Error al guardar beat:', error);
      Alert.alert('Error', 'No se pudo guardar el beat.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Beat / Grabación</Text>

      <TouchableOpacity style={styles.fileButton} onPress={handlePickFile}>
        <Text style={styles.fileButtonText}>
          {file ? `🎵 ${file.name}` : 'Seleccionar Archivo de Audio'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Título del Beat"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Género"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Subir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  fileButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  fileButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
