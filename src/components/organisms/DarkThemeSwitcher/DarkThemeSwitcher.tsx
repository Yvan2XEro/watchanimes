import { Button } from "@/components/ui/button";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MoonStar } from "./MoonStar";
import { Sun } from "./Sun";

export function DarkThemeSwitcher() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const { primary } = useThemeColor();
  return (
    <Button
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark";
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem("theme", newTheme);
      }}
      variant="ghost"
      size="icon"
    >
      {isDarkColorScheme ? (
        <MoonStar color={primary}  />
      ) : (
        <Sun color={primary} />
      )}
    </Button>
  );
}
