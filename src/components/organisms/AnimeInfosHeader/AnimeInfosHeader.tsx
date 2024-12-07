import React from "react";
import { Pressable, Text, View } from "react-native";
import { DetailRowSkeleton } from "./DetailRowSkeleton";

import { BLUR_HASH } from "@/lib/constants";
import { useFavouritesStore } from "@/lib/store/useFavouritesStore";
import { substring, transformOtherNames } from "@/lib/string";
import { Anime2 } from "@/lib/types/entities2";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { DetailRow } from "./DetailRow";

type TProps = {
  data?: Anime2;
  defaultImage: string;
  defaultTitle: string;
  isLoading: boolean;
  height: number;
  lastPlayEpisode?: string;
};

export default function AnimeInfosHeader(props: TProps) {
  const {
    data,
    defaultImage,
    defaultTitle,
    isLoading,
    height,
    lastPlayEpisode,
  } = props;
  const { isFaourite, toggleFavourite } = useFavouritesStore();
  return (
    <View className="max-w-full">
      <View className="flex-row items-center gap-2">
        <Image
          placeholder={BLUR_HASH}
          source={{
            uri: data?.animeImg || defaultImage,
          }}
          style={{
            width: 140,
            borderRadius: 5,
            height: 200,
          }}
        />
        <View className="flex-1">
          <Text className="text-[17px] font-bold w-full">
            {substring(data?.animeTitle || defaultTitle, 55)}
          </Text>
          <View className="mt-3 gap-2 flex-1">
            {isLoading ? (
              <View className="gap-2">
                <DetailRowSkeleton />
                <DetailRowSkeleton />
                <DetailRowSkeleton />
                <DetailRowSkeleton />
                <DetailRowSkeleton />
              </View>
            ) : (
              <>
                <DetailRow label="Type" value={data?.type} />
                <DetailRow
                  label="Status"
                  value={transformOtherNames(data?.otherNames)}
                />
                <DetailRow
                  label="Genre"
                  value={data?.releasedDate.replaceAll("Genre:", "")}
                />
                <DetailRow label="Episodes count" value={data?.totalEpisodes} />
              </>
            )}
          </View>
        </View>
      </View>
      <View
        style={{ height: height - 200, alignItems: "center" }}
        className="justify-center"
      >
        <View className="flex-row flex gap-1 flex-wrap items-start">
          <Pressable
            onPress={() => {
              if (!data) return;
              toggleFavourite({
                animeId: data.animeId,
                animeImg: data.animeImg,
                animeTitle: data.animeTitle,
                totalEpisodes: data.totalEpisodes,
              });
            }}
            className="bg-white p-2 rounded-lg flex-row items-center gap-2"
          >
            <Ionicons
              name={isFaourite(data?.animeId) ? "heart" : "heart-outline"}
              color={"#000000"}
              size={20}
            />
            <Text className="font-bold">Favourite</Text>
          </Pressable>

          {!!lastPlayEpisode && (
            <Pressable
              onPress={() => router.push(`/watch/${lastPlayEpisode}`)}
              className="bg-white p-2 rounded-lg flex-row items-center gap-2"
            >
              <Ionicons name={"pause"} color={"#000000"} size={20} />
              <Text className="font-bold">
                Continue [{lastPlayEpisode.split("episode-")[1]}]
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              if ((data?.episodesList.length || 0) > 0)
                router.push(`/watch/${data?.episodesList[0].episodeId}`);
            }}
            className="bg-white p-2 rounded-lg flex-row items-center gap-2"
          >
            <Ionicons name={"play"} color={"#000000"} size={20} />
            <Text className="font-bold">Play</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
