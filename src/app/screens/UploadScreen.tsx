import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.log('Error seleccionando archivo:', error);
    }
  };

  const handleUpload = () => {
    if (!title || !description || !file) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos y selecciona un beat.');
      return;
    }

    setLoading(true); // Mostrar indicador de carga

    // Simula una espera de 2 segundos
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Subida exitosa', `Tu beat "${title}" fue subido correctamente.`);

      // Limpiar los campos
      setTitle('');
      setDescription('');
      setFile(null);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir nuevo Beat</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        placeholderTextColor="#aaa"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.fileButton} onPress={handlePickFile}>
        <Text style={styles.fileButtonText}>
          {file ? `🎵 ${file.name}` : 'Seleccionar archivo de audio'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.uploadButton, loading && { backgroundColor: '#555' }]}
        onPress={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.uploadButtonText}>Subir Beat</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  fileButton: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  fileButtonText: {
    color: '#aaa',
    fontSize: 14,
  },
  uploadButton: {
    backgroundColor: '#a259ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
