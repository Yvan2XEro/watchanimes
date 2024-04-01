import React, { PropsWithChildren } from "react";
import AppQueryClient from "./providers/AppQueryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <AppQueryClient>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </AppQueryClient>
  );
}
