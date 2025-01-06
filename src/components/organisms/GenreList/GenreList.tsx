import { Text } from "@/components/ui/text";
import { SLASH_REPLACE } from "@/lib/constants";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { genres } from "./const";

export default function GenreList() {
 
  return (
    <View className="px-3 mb-2">
      <FlashList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={50}
        ItemSeparatorComponent={() => <View className="w-1" />}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                router.push(`animes/${item.id + SLASH_REPLACE + item.title}`)
              }
              className="p-1 px-3 rounded-lg text-[30px] bg-violet-600"
            >
              <Text className="text-white">{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
