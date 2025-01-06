import { HapticTab } from "@/components/atoms/HapticTab";
import { DarkThemeSwitcher } from "@/components/organisms/DarkThemeSwitcher";
import { Button } from "@/components/ui/button";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Platform, View } from "react-native";
import Animated from "react-native-reanimated";

export default function Layout() {
  const { text, card, primary } = useThemeColor();
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        // tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: card,
        },

        headerShadowVisible: false,
        tabBarButton: HapticTab,
        // tabBarBackground: BlurTabBarBackground,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: text,
        tabBarStyle: [
          Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWrapper
              size={28}
              name={focused ? "compass" : "compass-outline"}
              color={color}
              backgroundColor={focused ? "#7c3aed48" : undefined}
            />
          ),
          headerStyle: {
            // backgroundColor: PRIMARY
          },
          headerRight: () => (
            <View className="flex-row gap-3 items-center">
              <Button size="icon"
                // style={{ paddingRight: 8 }}
                variant="ghost"
                onPress={() => router.push("search")}
              >
                <Animated.View sharedTransitionTag="search">
                  <AntDesign name="search1" size={24} color={primary} />
                </Animated.View>
              </Button>
              <DarkThemeSwitcher />
            </View>
          ),
          headerTitleStyle: {
            color: primary,
          },
          headerTitle: "Hi Otaku!",
          tabBarLabel: "Search",
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWrapper
              size={28}
              color={color}
              backgroundColor={focused ? "#7c3aed48" : undefined}
              name={focused ? "time" : "time-outline"}
            />
          ),
          tabBarLabel: "Recents",
          title: "Recents",
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon({ color, focused }) {
            return (
              <TabBarIconWrapper
                size={28}
                name={focused ? "heart" : "heart-outline"}
                color={color}
                backgroundColor={focused ? "#7c3aed48" : undefined}
              />
            );
          },
          tabBarLabel: "Favourites",
          title: "Favourites",
        }}
      />
    </Tabs>
  );
}

function TabBarIconWrapper({ color, name, size, backgroundColor }) {
  return (
    <View
      className="items-center justify-center rounded-[15]"
      style={{
        borderRadius: 15,
        backgroundColor,
        width: 40,
        height: 30,
      }}
    >
      <Ionicons {...{ color, name, size }} />
    </View>
  );
}
