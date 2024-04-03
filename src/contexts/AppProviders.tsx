import React, { PropsWithChildren } from "react";
import AppQueryClient from "./providers/AppQueryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppBottomSheetProvider } from "./providers/app-bottom-sheet";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppBottomSheetProvider>
        <AppQueryClient>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </AppQueryClient>
      </AppBottomSheetProvider>
    </GestureHandlerRootView>
  );
}
