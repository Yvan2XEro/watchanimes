import React, { PropsWithChildren } from "react";
import AppQueryClient from "./providers/AppQueryClient";

export default function AppProviders({ children }: PropsWithChildren) {
  return <AppQueryClient>{children}</AppQueryClient>;
}
