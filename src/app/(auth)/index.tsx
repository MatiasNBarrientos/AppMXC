import { View, Text,SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import imagePath from '@/src/constants/imagePath'
import moderate, { moderateScale, verticalScale } from 'react-native-size-matters';
import vertical, { moderateVerticalScale } from 'react-native-size-matters';
import {useFonts, RuslanDisplay_400Regular } from '@expo-google-fonts/ruslan-display'
import { useEffect } from 'react';
import { useState } from 'react';
import { router } from 'expo-router';

const Auth = () => {
  const [fontsLoaded] = useFonts({
    RuslanDisplay_400Regular,
  })

const [isLoading, setIsLoading] = useState(false);

let navigateTermsAgree = () => {
    router.push('/(auth)/terms_agree');
};

let loadingTimeout = () => {
    setIsLoading(true);
    setTimeout(navigateTermsAgree, 2000);
};
 

  useEffect(() => {
    setTimeout(loadingTimeout, 2000);
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Text style= {styles.MelodyText}>MelodyXChange</Text>
        <Image source={imagePath.logo} style= {styles.logoStyle} resizeMode='contain'/>
      </View>
      <View style={styles.footer}>
        { isLoading ?(
            <>
              <ActivityIndicator size={moderateScale(48)} color={'#6E0A94'}/>
              <Text style={styles.TeamText}>Loading...</Text>
            </>
        ): (
           <>
            <Text style= {styles.FromText}>Made with ❤️ by</Text>
            <Text style= {styles.TeamText}>MXC TEAM</Text>
          </>
        )} 
        
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(70),
  },
  header: {},
  body: {
    alignItems: 'center',
    gap: moderateVerticalScale(7),
  },
  footer: {
    alignItems: 'center',
    height: verticalScale(70),
    justifyContent: 'flex-end',
  },
  logoStyle: {
    width: moderateScale(70),
    height: moderateScale(70),
  },
  MelodyText: {
    fontSize: moderateScale(30),
    color: '#9A0FD2',
    textAlign: 'center',
    fontFamily: 'RuslanDisplay_400Regular',
  },
  FromText: {
    fontSize: moderateScale(12),
    color: '#867373',

  },
  TeamText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#867373',
  },
})

export default Auth