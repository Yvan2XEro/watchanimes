import { usePathname } from "expo-router";

export const useIsInsideTabNavigator = () => {
  const pathname = usePathname();

  const tabRoutes = ["/", "/recents", "/favourites"];

  const isInsideTab = tabRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return isInsideTab;
};
