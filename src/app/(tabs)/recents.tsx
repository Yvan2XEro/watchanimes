import { BLUR_HASH } from "@/lib/constants";
import { useRecentsViewsStore } from "@/lib/store/useRecentsViewsStore";
import { argsToMultiparams, substring } from "@/lib/string";
import { formatDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Content />
    </View>
  );
}

function Content() {
  const { items } = useRecentsViewsStore();

  return (
    <View className="flex-1 px-3">
      <FlashList
        data={Object.entries(items)
          .map(([_, item]) => item)
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA.getTime() === dateB.getTime()) {
              return 0;
            }
            return dateA.getTime() > dateB.getTime() ? 1 : -1;
          })
          .reverse()}
        estimatedItemSize={350}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.animeId}
        renderItem={({ item }) => {
          return (
            <View className="flex-1 flex-row mb-2">
              <Image
                placeholder={BLUR_HASH}
                source={{
                  uri: item.animeImg,
                }}
                style={{
                  width: 15000 / 212,
                  borderRadius: 5,
                  height: 100,
                }}
              />
              <View className="flex-1 p-2 gap-1">
                <Pressable onPress={()=> router.push(`/animes/details/${argsToMultiparams(item.animeId, item.animeImg, item.animeTitle)}`)}>
                  <Text className="text-xl font-bold flex-wrap ">
                    {substring(item.animeTitle, 45)}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="time-sharp" size={15} />
                    <Text className="text-sm text-violet-600">
                      {formatDate(new Date(item.date))}
                    </Text>
                  </View>
                  <View>
                    <Text>Episode {item.episodeId.split("-episode-")[1]}</Text>
                  </View>
                </Pressable>
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
