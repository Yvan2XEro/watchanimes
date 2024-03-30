import "../global.css";
import { AppProviders } from "@/contexts";
import { Stack} from "expo-router";
import { PropsWithChildren } from "react";

export default function Layout({children}: PropsWithChildren) {
  return (
    <AppProviders>
     <Stack >
        <Stack.Screen name="(tabs)" options={{headerShown: false,}}/>
        <Stack.Screen name="(stack)" />
     </Stack>
    </AppProviders>
  );
}
