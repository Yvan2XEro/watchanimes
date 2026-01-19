import { PlayerModal } from "@/components/organisms/PlayerModal";
import FullScreenPlayer from "@/components/organisms/PlayerModal/FullScreenPlayer";
import { AppProviders } from "@/contexts";
import { NAV_THEME } from "@/lib/constants/themes";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider, useTheme } from "@react-navigation/native";
import "expo-dev-client";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from "react-native";
import "../global.css";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";
const LIGHT_THEME: Partial<Theme> = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Partial<Theme> = {
  dark: true,
  colors: NAV_THEME.dark,
};
export default function Layout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }


  return (
    <ThemeProvider
      value={{ ...theme, ...(isDarkColorScheme ? DARK_THEME : LIGHT_THEME) }}
    >
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <AppProviders>
        <>
          <PlayerModal />
          <FullScreenPlayer />
        </>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AppProviders>
    </ThemeProvider>
  );
}
