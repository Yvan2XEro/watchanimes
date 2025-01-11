import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppQueryClient from "./providers/AppQueryClient";
import { VideoProvider } from "./providers/video-provider";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppQueryClient>
        <VideoProvider>
          <BottomSheetModalProvider>
            <SafeAreaProvider>{children}</SafeAreaProvider>
          </BottomSheetModalProvider>
        </VideoProvider>
      </AppQueryClient>
    </GestureHandlerRootView>
  );
}
