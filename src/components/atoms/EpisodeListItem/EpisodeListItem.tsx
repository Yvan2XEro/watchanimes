import { View, Text } from "react-native";
import React from "react";
import { Episode2 } from "@/lib/types/entities2";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppSkeleton } from "../AppSkeleton";

export function EpisodeItem({ episode }: { episode: Episode2 }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/watch/${episode.episodeId}`)}
      className="rounded-lg overflow-hidden py-2"
    >
      <View className="flex-row justify-between items-center">
        <Text className="font-semibold text-[18px] pl-2">
          {episode.episodeNum}
          {"   "}Episode {episode.episodeNum}
        </Text>
        <Ionicons name="chevron-forward" size={24} color={"#000"} />
      </View>
    </TouchableOpacity>
  );
}

export function EpisodeItemSKeleton() {
  return (
    <AppSkeleton>
      <View style={{ width: "100%", height: 20, borderRadius: 5 }} />
    </AppSkeleton>
  );
}
