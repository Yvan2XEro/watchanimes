import { ActivityIndicator, View } from "react-native";

export function ViedeoPlaceholder() {
    return (
      <View className="w-full h-full inset-0 bg-black flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  