import {
    EpisodeItem,
    EpisodeItemSKeleton,
} from "@/components/atoms/EpisodeListItem";
import { Text } from "@/components/ui/text";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { Anime2 } from "@/lib/types/entities2";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface IProps {
  anime: Anime2;
  isLoading?: boolean;
  latestEpisode?: string;
}
const EpisodesList = ({ anime, isLoading, latestEpisode }: IProps) => {
  const { text } = useThemeColor();
  const [reversed, setReversed] = useState(false);

  return (
    <>
      <View className="bg-card py-1 flex-row items-center gap-2 justify-between px-3">
        <Text className="font-bold text-xl">Episodes list</Text>
        <TouchableOpacity
          onPress={() => setReversed((v) => !v)}
          className="border-foreground border bg-card rounded-md py-1 px-2 flex-row gap-1 items-center"
        >
          <Text className="font-bold">A-Z</Text>
          <Ionicons
            name={reversed ? "arrow-up" : "arrow-down"}
            size={18}
            color={text}
          />
        </TouchableOpacity>
      </View>
      <View className="bg-card px-3 gap-1">
        {isLoading ? (
          <>
            {Array.from({ length: 40 }).map((_, i) => (
              <EpisodeItemSKeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {reversed &&
              anime.episodesList?.map((e) => (
                <EpisodeItem anime={anime} key={e.episodeId} episode={e} />
              ))}

            {!reversed &&
              anime?.episodesList
                .map((e) => (
                  <EpisodeItem
                    key={e.episodeId}
                    anime={anime}
                    episode={e}
                    isPlaying={latestEpisode === e.episodeId}
                  />
                ))
                ?.reverse()}
          </>
        )}
      </View>
    </>
  );
};

export default EpisodesList;
