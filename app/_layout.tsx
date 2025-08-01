import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { useEffect } from "react";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

function RootLayoutNav() {
  return (

  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "FunnelSans-Regular": require("../assets/fonts/FunnelSans-Regular.ttf"),
    "FunnelSans-Bold": require("../assets/fonts/FunnelSans-Bold.ttf"),
    "FunnelSans-Light": require("../assets/fonts/FunnelSans-Light.ttf"),
    "FunnelSans-Medium": require("../assets/fonts/FunnelSans-Medium.ttf"),
    "FunnelSans-SemiBold": require("../assets/fonts/FunnelSans-SemiBold.ttf"),
    "FunnelSans-ExtraBold": require("../assets/fonts/FunnelSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
