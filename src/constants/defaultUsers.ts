import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export async function createDefaultUsers() {
  const buyerKey = 'comprador@admin.com';
  const sellerKey = 'vendedor@admin.com';
  const defaultPassword = 'Admin135#';
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    defaultPassword
  );


  const buyerExists = await AsyncStorage.getItem(buyerKey);
  if (!buyerExists) {
    await AsyncStorage.setItem(
      buyerKey,
      JSON.stringify({
        nombre: 'Comprador Admin',
        username: 'comprador',
        email: buyerKey,
        password: hashedPassword,
        role: 'buyer',
      })
    );
  }

  const sellerExists = await AsyncStorage.getItem(sellerKey);
  if (!sellerExists) {
    await AsyncStorage.setItem(
      sellerKey,
      JSON.stringify({
        nombre: 'Vendedor Admin',
        username: 'vendedor',
        email: sellerKey,
        password: hashedPassword,
        role: 'seller',
      })
    );
  }
}
