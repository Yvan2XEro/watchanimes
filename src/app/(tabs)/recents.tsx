import { AnimeItem2 } from "@/components/organisms/AnimeSection2/AnimeItem2";
import { BLUR_HASH } from "@/lib/constants";
import { useRecentsViewsStore } from "@/lib/store/useRecentsViewsStore";
import { substring } from "@/lib/string";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Content />
    </View>
  );
}

function Content() {
  const { items } = useRecentsViewsStore();
  console.log(items.length)

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        estimatedItemSize={350}
        renderItem={({ item }) => {
          return (
            <View className="flex-1 flex-row p-1">
              <Image
                placeholder={BLUR_HASH}
                source={{
                  uri: item.animeImg,
                }}
                style={{
                  width: 15000/212,
                  borderRadius: 5,
                  height: 100,
                }}
              />
              <View className="flex-1 p-2 gap-1">
                <Text className="text-xl font-bold flex-wrap ">
                  {substring(item.animeTitle, 45)}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-sharp" size={15} />
                  <Text className="text-sm text-violet-600">{item.date}</Text>
                </View>
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => router.push(`/watch/${item.episodeId}`)}
                    className="bg-white p-2 rounded-lg flex-row items-center gap-2"
                  >
                    <Ionicons name={"play"} color={"#000000"} size={20} />
                    <Text className="font-bold">Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
