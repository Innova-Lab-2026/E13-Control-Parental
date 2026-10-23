
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="onboarding2" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
<<<<<<< Updated upstream
      
=======
      <Stack.Screen name="tutor/dashboard" />
      <Stack.Screen name="tutor/devices" />
      <Stack.Screen name="tutor/device-detail" />
>>>>>>> Stashed changes
    </Stack>
  );
}
