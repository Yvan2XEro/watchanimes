import { AppSkeleton } from "@/components/atoms/AppSkeleton";
import { View } from "react-native";

export function DetailRowSkeleton() {
    return (
      <AppSkeleton>
        <View style={{ width: "100%", height: 15, borderRadius: 15 }} />
      </AppSkeleton>
    );
  }
  