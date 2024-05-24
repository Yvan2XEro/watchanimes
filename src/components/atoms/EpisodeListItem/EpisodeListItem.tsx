import { View, Text } from "react-native";
import React from "react";
import { Episode2 } from "@/lib/types/entities2";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppSkeleton } from "../AppSkeleton";
import { PRIMARY } from "@/lib/constants";
import { useAppBottomSheet } from "@/contexts/providers/app-bottom-sheet";

export function EpisodeItem({
  episode,
  isPlaying = false,
}: {
  episode: Episode2;
  isPlaying?: boolean;
}) {
  const { dismissAppBottomSheet } = useAppBottomSheet();
  return (
    <TouchableOpacity
      onPress={() => {
        if(isPlaying) {
          return dismissAppBottomSheet()
        }
        router.push(`/watch/${episode.episodeId}`)}}
      className="rounded-lg overflow-hidden py-2"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <View className="flex-[0.27] items-center justify-center min-w-[35]">
            {isPlaying ? (
              <View
                className="items-center justify-center border p-1 flex-1 w-[30] h-[30]"
                style={{ borderRadius: 25, borderColor: PRIMARY }}
              >
                <Ionicons name="play" size={15} color={PRIMARY} />
              </View>
            ) : (
              <Text className="font-semibold text-[18px]">
                {episode.episodeNum}
              </Text>
            )}
          </View>
          <Text className="font-semibold text-[18px]">
            Episode {episode.episodeNum}
          </Text>
        </View>
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
