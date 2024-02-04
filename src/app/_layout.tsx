import "../global.css";
import { Tabs } from "expo-router/tabs";
import { AntDesign } from "@expo/vector-icons";
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
  );
}

function AppTabBarIcon({ color, focused, iconName, label }) {
  return (
    <View className="flex flex-col items-center">
      <View
        style={
          focused
            ? {
                backgroundColor: "black",
                padding: 3,
                paddingHorizontal: 8,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }
            : undefined
        }
      >
        <AntDesign
          name={iconName}
          size={focused ? 20 : 24}
          color={focused ? "#fff" : "#000"}
        />
      </View>
      {focused && <Text style={{ fontSize: 12, color }}>{label}</Text>}
    </View>
  );
}
