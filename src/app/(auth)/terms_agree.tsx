import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getThemeColors, useDynamicStyles } from '@/src/styles/globalStyles';

const TermsScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const { themeColors, ...dynamicStyles } = useDynamicStyles();

  return (
    <SafeAreaView style={[dynamicStyles.container, { backgroundColor: themeColors.background }]}>
      <View>
        <TouchableOpacity
        style={[dynamicStyles.backButton]}
        onPress={() => router.back()}>
          <View style={[dynamicStyles.circle, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
          </View>
        </TouchableOpacity>

        <Text style={[dynamicStyles.title, dynamicStyles.textLarge, { color: themeColors.primary }]}>
          Términos y Condiciones
        </Text>

        <View style={[dynamicStyles.body]}>
          <ScrollView
            style={[styles.scroll, { backgroundColor: themeColors.background }]}
            contentContainerStyle={{ paddingBottom: 20 }}
            ref={scrollViewRef}
          >
            <Text style={[styles.text, dynamicStyles.baseText, { color: themeColors.text }]}>
              {/* Texto largo de términos */}
              L15.1 Gracias por visitar nuestra aplicación y registrarte como miembro.{"\n\n"}
              15.2 Tu privacidad es importante para nosotros. Para protegerla mejor, estamos proporcionando
              este aviso explicando nuestra política con respecto a la información que compartes con nosotros.
              Esta política de privacidad se relaciona con la información que recopilamos en línea desde la
              aplicación, recibida por correo electrónico, fax, teléfono, en persona o de cualquier otra manera,
              y que retenemos y usamos para el propósito de brindarte servicios.{'\n\n'}
              15.3 Al usar esta aplicación, aceptas los términos de esta política de privacidad.{'\n\n'}
              15.4 Nos reservamos el derecho de actualizar esta política de privacidad de vez en cuando.
              Notificaremos sobre cambios significativos enviando un aviso al correo electrónico principal
              especificado en tu cuenta o colocando un aviso destacado en nuestra aplicación antes de que
              los cambios entren en vigor.{'\n\n'}
              15.5 Continuar usando la aplicación después de cualquier cambio constituye tu aceptación de la
              nueva política de privacidad.{'\n\n'}
              {/* Agrega más texto según sea necesario */}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor:"red"
  },
  scroll: {
    flex: 1,
  },
  text: {
    lineHeight: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
