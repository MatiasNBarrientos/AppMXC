import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { getThemeColors, useDynamicStyles } from '@/src/styles/globalStyles';
import { useRouter } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import  imagePath from '@/src/constants/imagePath';

export default function ContactUsScreen() {
  const router = useRouter();
  const { themeColors, ...dynamicStyles } = useDynamicStyles();
  const [isSent, setIsSent] = useState(false);

  return (
    <ScrollView contentContainerStyle={[styles.container, { flex: 1, backgroundColor: themeColors.background}]}>
       <View style={[styles.header]}>
        <TouchableOpacity
        style={[dynamicStyles.backButton]}
        onPress={() => router.back()}>
            <View style={[dynamicStyles.circle, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
            </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.title]}>Contáctanos</Text>
      </View>

      <View style={styles.contactInfo}>

        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={[dynamicStyles.textBold, { color: themeColors.primary}]}>melodyxchange@gmail.com</Text>
        </View>
        <View>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={[dynamicStyles.textBold, { color: themeColors.primary}]}>+54 362 492 6735</Text>
        </View>
      </View>

    { isSent ? (
        <>
            <View style={[dynamicStyles.container, { justifyContent: "center"}]}>
                <Image source={imagePath.sent} style={{ width: moderateScale(106), height: moderateScale(86) }} />
                <Text style={styles.sentTitle}>¡Muchas gracias!</Text>
                <Text style={styles.sentText}>
                ¡Tu mensaje ha sido recibido! {"\n"}
                Uno de los miembros se contra en contacto contigo.
                </Text>

                <TouchableOpacity
                style={dynamicStyles.button}
            onPress={() => router.push('/(buyer)/profile')}
                >
                <Text style={dynamicStyles.buttonText}>Volver al perfil</Text>
                </TouchableOpacity>
            </View>
        </>

        ): (
            <>
                <TextInput style={styles.input} placeholder="Name" />
                <TextInput style={styles.input} placeholder="Email" />

                <View style={styles.row}>
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="+54" />
                <TextInput style={[styles.input, { flex: 3, marginLeft: 10 }]} placeholder="Phone" />
                </View>

                <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Mensaje..."
                multiline
                />

                <TouchableOpacity
                style={dynamicStyles.button}
                onPress={() => setIsSent(true)}
                >
                <Text style={dynamicStyles.buttonText}>Enviar</Text>
                </TouchableOpacity>
      </>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
      marginBottom: 40,
      alignItems:"center",
      flexDirection: 'row',
      justifyContent: "space-evenly",
  },
  headerTitle: {
    flex: 1,
    alignContent:"center",
    marginRight: moderateScale(60),

  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  link: {
    color: '#f72c61',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
  sentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  sentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  sentText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
});
