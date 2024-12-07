import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { Text, View } from "react-native";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon({ color, focused, size }) {
            return (
              <AppTabBarIcon
                color={color}
                focused={focused}
                iconName="search-outline"
                label="Brownse"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          tabBarIcon({ color, focused, size }) {
            return (
              <AppTabBarIcon
                color={color}
                focused={focused}
                iconName="time-outline"
                label="Recents"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon({ color, focused, size }) {
            return (
              <AppTabBarIcon
                color={color}
                focused={focused}
                iconName="heart-outline"
                label="Favourites"
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

function AppTabBarIcon({ color, focused, iconName, label }) {
  return (
    <View className="flex flex-col items-center flex-1 py-1">
      <View
        className={`${focused ? "bg-violet-600" : ""}`}
        style={{
          padding: 3,
          paddingHorizontal: 15,
          borderRadius: 15,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={iconName} size={20} color={focused ? "#fff" : "#000"} />
      </View>
      {<Text style={{ fontSize: 12, color, flex: 1 }}>{label}</Text>}
    </View>
  );
}
