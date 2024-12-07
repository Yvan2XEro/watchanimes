import { AppProviders } from "@/contexts";
import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          animation: "ios",
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen
          name="(stack)/watch/[id]"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        /> */}
      </Stack>
    </AppProviders>
  );
}
