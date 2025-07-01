import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarHidden: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="success" />
      <Stack.Screen name="error" />
      <Stack.Screen name="card" />
    </Stack>
  );
}