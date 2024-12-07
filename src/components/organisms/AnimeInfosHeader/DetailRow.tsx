import { Text, View } from "react-native";

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row gap-2 items-center flex-wrap max-w-full">
      <View className="w-2 h-2 rounded-full bg-violet-600"></View>
      <View className="flex-row flex-1">
        <Text className="font-bold">{label}: </Text>
        <Text className="font-bold text-violet-600 flex-1 flex-wrap ">
          {value}
        </Text>
      </View>
    </View>
  );
}
