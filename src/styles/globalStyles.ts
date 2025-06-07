import { StyleSheet, useColorScheme } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const colors = {
  light: {
    background: '#FFFFFF',
    background2: '#BFBFBF', // Fondo claro
    primary: '#9918B3', // Morado (color principal)
    secondary: '#CE09F7', // Púrpura eléctrico
    accent: '#28C7EC', // Azul cielo vivo
    text: '#000', // Texto oscuro
  },
  dark: {
    background: '#000',
    background2:'#180D1A', // Fondo oscuro actualizado
    primary: '#BB86FC', // Morado más brillante
    secondary: '#CE09F7', // Púrpura eléctrico brillante
    accent: '#40E0FD', // Azul cielo más brillante
    text: '#FFFFFF', // Texto claro
  },
};

// Hook para obtener los colores según el tema
export function getThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? colors.dark : colors.light;
}

// Hook para los estilos dinámicos
export function useDynamicStyles() {
  const themeColors = getThemeColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: themeColors.background,
    },
    header: {
      width: '100%',
      height: verticalScale(50),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(20),
    },
    textCenter: {
      textAlign: 'center',
      color: themeColors.text, // Texto dinámico
    },
    footer: {
      alignItems: 'center',
      height: verticalScale(70),
      justifyContent: 'flex-end',
    },
    link: {
      color: themeColors.primary,
      fontWeight: 'bold',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      gap: verticalScale(15), // Espaciado entre botones
      marginTop: verticalScale(20),
    },
    button: {
      margin: moderateScale(20),
      borderRadius: moderateScale(10),
      paddingVertical: moderateScale(15),
      alignItems: 'center',
      width: '80%',
      backgroundColor: themeColors.primary,
    },
    buttonText: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: themeColors.background,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: verticalScale(20),
    },
    dot: {
      width: moderateScale(10),
      height: moderateScale(10),
      borderRadius: moderateScale(5),
      marginHorizontal: moderateScale(5),
      backgroundColor: themeColors.secondary,
    },
    slide: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(20),
    },
    image: {
      width: moderateScale(250),
      height: moderateScale(250),
      marginBottom: verticalScale(30),
    },
    title: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      marginBottom: verticalScale(10),
      textAlign: 'center',
      color: themeColors.primary,
    },
    description: {
      fontSize: moderateScale(16),
      textAlign: 'center',
      paddingHorizontal: moderateScale(20),
      lineHeight: moderateScale(22),
      color: themeColors.secondary,
    },
    logoStyle: {
      width: moderateScale(100),
      height: moderateScale(100),
    },
    // Estilos para inputs
    input: {
      borderWidth: 1,
      borderColor: themeColors.secondary,
      borderRadius: moderateScale(10),
      padding: verticalScale(15),
      marginBottom: verticalScale(10),
      fontSize: moderateScale(16),
      color: themeColors.text,
      width: '100%',
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: moderateScale(14),
      marginBottom: verticalScale(5),
    },
    passwordContainer: {
      position: 'relative',
      width: '100%',
      marginBottom: verticalScale(15),
    },
    showPasswordButton: {
      position: 'absolute',
      right: moderateScale(12),
      top: '50%',
      transform: [{ translateY: -12 }],
      padding: moderateScale(8),
    },
    showPasswordIcon: {
      fontSize: moderateScale(20),
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: moderateScale(20),
    },
    loginTitle: {
      fontSize: moderateScale(28),
      marginBottom: verticalScale(10),
    },
    loginSubtitle: {
      fontSize: moderateScale(16),
      marginBottom: verticalScale(30),
    },
    // Estilo base para textos
    baseText: {
      color: themeColors.text,
      fontSize: moderateScale(16),
      fontFamily: 'System',
    },
    textSmall: {
      fontSize: moderateScale(14),
      color: themeColors.text,
    },
    textMedium: {
      fontSize: moderateScale(16),
      color: themeColors.text,
    },
    textLarge: {
      fontSize: moderateScale(18),
      color: themeColors.text,
    },
    textBold: {
      fontWeight: 'bold',
      color: themeColors.text,
    },
    requirementText: {
      fontSize: 14,
      marginBottom: 5,
      color: themeColors.text,
    },
    requirementMet: {
      color: '#34c759',
    },
    requirementNotMet: {
    color: '#ff3b30',
  },
  });

  return {
    ...styles,
    themeColors, // Exportamos themeColors junto con los estilos
  };
}
