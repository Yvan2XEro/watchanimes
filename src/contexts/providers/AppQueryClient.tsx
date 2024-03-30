import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function AppQueryClient({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
