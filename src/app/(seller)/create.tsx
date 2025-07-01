import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import * as DocumentPicker from 'expo-document-picker';

export default function CreateBeat() {
  const dynamicStyles = useDynamicStyles();
  const [beatData, setBeatData] = useState<BeatData>({
    title: '',
    genre: '',
    bpm: '',
    price: '',
    description: '',
    audioFile: null
  });

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        multiple: false
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setBeatData(prev => ({
          ...prev,
          audioFile: result.assets[0]
        }));
      }
    } catch (error) {
      console.error('Error al seleccionar archivo:', error);
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const handleSubmit = async () => {
    if (!beatData.audioFile) {
      Alert.alert('Error', 'Debes seleccionar un archivo de audio');
      return;
    }

    if (!beatData.title || !beatData.genre) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    const price = parseFloat(beatData.price);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor a 0');
      return;
    }

    const bpm = parseInt(beatData.bpm);
    if (isNaN(bpm) || bpm <= 0) {
      Alert.alert('Error', 'El BPM debe ser un número válido mayor a 0');
      return;
    }

    
    console.log('Datos del beat:', {
      ...beatData,
      price: price,
      bpm: bpm
    });
  };

  const resetForm = () => {
    setBeatData({
      title: '',
      genre: '',
      bpm: '',
      price: '',
      description: '',
      audioFile: null
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: dynamicStyles.themeColors.text }]}>
          Subir nuevo beat
        </Text>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: dynamicStyles.themeColors.background2,
              color: dynamicStyles.themeColors.text 
            }]}
            placeholder="Título del beat"
            placeholderTextColor={dynamicStyles.themeColors.secondary}
            value={beatData.title}
            onChangeText={(text) => setBeatData(prev => ({ ...prev, title: text }))}
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: dynamicStyles.themeColors.background2,
              color: dynamicStyles.themeColors.text 
            }]}
            placeholder="Género"
            placeholderTextColor={dynamicStyles.themeColors.secondary}
            value={beatData.genre}
            onChangeText={(text) => setBeatData(prev => ({ ...prev, genre: text }))}
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: dynamicStyles.themeColors.background2,
              color: dynamicStyles.themeColors.text 
            }]}
            placeholder="BPM"
            placeholderTextColor={dynamicStyles.themeColors.secondary}
            value={beatData.bpm}
            onChangeText={(text) => setBeatData(prev => ({ ...prev, bpm: text }))}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: dynamicStyles.themeColors.background2,
              color: dynamicStyles.themeColors.text 
            }]}
            placeholder="Precio ($USD)"
            placeholderTextColor={dynamicStyles.themeColors.secondary}
            value={beatData.price}
            onChangeText={(text) => setBeatData(prev => ({ ...prev, price: text }))}
            keyboardType="decimal-pad"
          />

          <TextInput
            style={[styles.textArea, { 
              backgroundColor: dynamicStyles.themeColors.background2,
              color: dynamicStyles.themeColors.text 
            }]}
            placeholder="Descripción (opcional)"
            placeholderTextColor={dynamicStyles.themeColors.secondary}
            value={beatData.description}
            onChangeText={(text) => setBeatData(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity 
            style={[styles.uploadButton, { backgroundColor: dynamicStyles.themeColors.background2 }]}
            onPress={handleFilePick}
          >
            <Ionicons 
              name="cloud-upload-outline" 
              size={24} 
              color={dynamicStyles.themeColors.primary} 
            />
            <Text style={[styles.uploadText, { color: dynamicStyles.themeColors.text }]}>
              {beatData.audioFile ? beatData.audioFile.name : 'Seleccionar archivo de audio'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: dynamicStyles.themeColors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Publicar Beat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(50),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    paddingHorizontal: moderateScale(20),
  },
  form: {
    padding: moderateScale(20),
  },
  input: {
    height: verticalScale(50),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(15),
    fontSize: moderateScale(16),
  },
  textArea: {
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(15),
    fontSize: moderateScale(16),
    minHeight: verticalScale(100),
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  uploadText: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
  },
  submitButton: {
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

interface BeatData {
  title: string;
  genre: string;
  bpm: string;
  price: string;
  description: string;
  audioFile: DocumentPicker.DocumentPickerAsset | null;
}