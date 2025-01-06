import { NAV_THEME } from "../constants/themes";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor() {
  const { isDarkColorScheme } = useColorScheme();
  return isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
}
