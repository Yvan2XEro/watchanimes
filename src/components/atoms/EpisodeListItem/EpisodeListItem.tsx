import { Text } from "@/components/ui/text";
import { useAppBottomSheet } from "@/contexts/providers/app-bottom-sheet";
import { PRIMARY } from "@/lib/constants";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { Anime2, Episode2 } from "@/lib/types/entities2";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import { AppSkeleton } from "../AppSkeleton";

type TProps = {
  episode: Episode2;
  isPlaying?: boolean;
  anime: Anime2;
};
export function EpisodeItem(props: TProps) {
  const { episode, isPlaying = false, anime } = props;
  const { playAnime } = usePlayerStatusStore();
  const { text } = useThemeColor()
  
  const { dismissAppBottomSheet } = useAppBottomSheet();
  return (
    <TouchableOpacity
      onPress={() => {
        if (isPlaying) {
          return dismissAppBottomSheet();
        }
        playAnime({
          ...anime,
          episodeId: episode.episodeId,
          episodeNum: episode.episodeNum,
          episodeUrl: episode.episodeUrl,
        });
        // router.push(`/watch/${episode.episodeId}`);
      }}
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
        <Ionicons name="chevron-forward" size={24} color={text} />
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
