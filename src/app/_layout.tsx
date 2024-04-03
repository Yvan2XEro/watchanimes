import "../global.css";
import { AppProviders } from "@/contexts";
import { Stack } from "expo-router";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AppProviders>
      <Stack screenOptions={{
        animation: "ios"
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(stack)" /> */}
        {/* <Stack.Screen name="(stack)/animes/details/[id_image_title]" 
        options={{
          animation: "ios"
        }}
         /> */}
        <Stack.Screen
          name="(stack)/watch/[id]"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom"
          }}
        />
      </Stack>
    </AppProviders>
  );
}
