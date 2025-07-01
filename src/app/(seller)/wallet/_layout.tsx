import { Stack} from 'expo-router';

export default function WalletLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarHidden: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="bancaria" />
      <Stack.Screen name="crypto" />
      <Stack.Screen name="paypal" />
      <Stack.Screen name="seleccionar" />
      <Stack.Screen name="success" />
    </Stack>
  );
}