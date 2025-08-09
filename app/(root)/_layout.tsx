import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="select-mariachi" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-mariachi" options={{ headerShown: false }} />
      <Stack.Screen name="book-mariachi" options={{ headerShown: false }} />
    </Stack>
  );
}
