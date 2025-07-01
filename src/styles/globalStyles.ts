import { StyleSheet, useColorScheme } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const colors = {
  light: {
    background: '#FFFFFF',
    background2: '#BFBFBF',
    primary: '#9918B3',
    secondary: '#CE09F7',
    accent: '#28C7EC',
    text: '#000',
  },
  dark: {
    background: '#000',
    background2:'#180D1A',
    primary: '#BB86FC',
    secondary: '#CE09F7',
    accent: '#40E0FD',
    text: '#FFFFFF',
  },
};


export function getThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? colors.dark : colors.light;
}


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
      color: themeColors.text,
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
      gap: verticalScale(15),
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
    textSection: {
      fontSize: moderateScale(16),
      color: themeColors.background2,
    },
    backButton: {
    padding: moderateScale(12),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    },
    circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  });

  return {
    ...styles,
    themeColors,
  };
}
