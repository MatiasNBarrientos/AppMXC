import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TermsScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isBottom && !isAtBottom) {
      setIsAtBottom(true);
    }
  };

  const handleAccept = () => {
    router.replace('/(auth)/start');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Botón volver */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Terms & Conditions</Text>

        <ScrollView
          style={styles.scroll}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
        >
          <Text style={styles.text}>
            {/* Texto largo de términos */}
            L15.1 Thank you for visiting our Application 
            Doctor 24×7 and enrolling as a member.{'\n\n'}
            15.2 Your privacy is important to us. To better
            protect your privacy, we are providing this notice 
            explaining our policy with regards to the information 
            you share with us. This privacy policy relates to the 
            information we collect, online from Application, received 
            through the email, by fax or telephone, or in person or
            in any other way and retain and use for the purpose of
            providing you services. If you do not agree to the terms
            in this Policy, we kindly ask you not to use these 
            portals and/or sign the contract document.{'\n\n'}
            15.3 In order to use the services of this Application,
            You are required to register yourself by verifying 
            the authorised device. This Privacy Policy applies
            to your information that we collect and receive on
            and through Doctor 24×7; it does not apply to practices
            of businesses that we do not own or control or people
            we do not employ.{'\n\n'}
            15.4 By using this Application, you agree to the terms of this Privacy Policy.
            {'\n\n'}
            15.5 We may update this Privacy Policy from time to time.
            We will notify you about significant changes in the way we treat personal information
            by sending a notice to the primary email address specified in your account or by placing
            a prominent notice on our site, prior to the change becoming effective.
            You are responsible for reviewing the changes to this Privacy Policy.
            Your continued use of the Application after any such changes constitutes your acceptance
            of the new Privacy Policy.
            {'\n\n'}
            15.6 We collect information from you when you register on our Application, place an order,
            subscribe to our newsletter, respond to a survey or fill out a form.
            When registering on our Application, as appropriate, you may be asked to enter your: name,
            email address, mailing address, phone number or credit card information.
            You may, however, visit our Application anonymously.
            {'\n\n'}
            15.7 We use the information we collect from you when you register, make a purchase,
            sign up for our newsletter, respond to a survey or marketing communication,
            surf the Application, or use certain other Application features in the following ways:
            {'\n\n'}
            - To personalize your experience and to allow us to deliver the type of content and product offerings
            in which you are most interested.
            {'\n\n'}
            - To improve our Application in order to better serve you.
            {'\n\n'}
            - To allow us to better service you in responding to your customer service requests.
            {'\n\n'}
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={[styles.button, !isAtBottom && styles.buttonDisabled]}
          onPress={handleAccept}
          disabled={!isAtBottom}
        >
          <Text style={styles.buttonText}>Agree and continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56, // Espacio para la flecha y el título
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 12, // Más cerca del borde superior
    left: 8,
    zIndex: 10,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#00020D',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#00020D80',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
