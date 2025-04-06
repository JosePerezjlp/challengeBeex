import "react-native-reanimated";
import "../global.css";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native";
import Navbar from "@/components/Navbar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const showNavbar = ["/complexes", "/profile", "/matches"].includes(pathname);
  return (
    <SafeAreaView className="flex-1">
      <Stack>
        <Stack.Screen name="complexes" options={{ title: "" }} />
        <Stack.Screen name="editProfile" options={{ title: "" }} />
        <Stack.Screen name="favorites" options={{ title: "" }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="matches" options={{ title: "" }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "" }} />
        <Stack.Screen name="resetPassword" options={{ title: "" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Navbar showFooter={showNavbar} pathname={pathname} />
    </SafeAreaView>
  );
}
