import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppQueryClient from "./providers/AppQueryClient";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppQueryClient>
        <BottomSheetModalProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </BottomSheetModalProvider>
      </AppQueryClient>
    </GestureHandlerRootView>
  );
}
