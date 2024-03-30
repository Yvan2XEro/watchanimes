import { Tabs } from "expo-router/tabs";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { AppProviders } from "@/contexts";

export default function Layout() {
  return (
    <AppProviders>
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
                  iconName="home"
                  label="Home"
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
                  iconName="clockcircleo"
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
                  iconName="heart"
                  label="Favourites"
                />
              );
            },
          }}
        />
      </Tabs>
    </AppProviders>
  );
}

function AppTabBarIcon({ color, focused, iconName, label }) {
  return (
    <View className="flex flex-col items-center">
      <View
      className={`${focused ? "bg-violet-600": ""}`}
        style={{
          padding: 3,
          paddingHorizontal: 15,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name={iconName} size={20} color={focused?"#fff": "#000"} />
      </View>
      {<Text style={{ fontSize: 12, color }}>{label}</Text>}
    </View>
  );
}
