import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { BLUR_HASH } from "@/lib/constants";
import { extractsArgs, substring } from "@/lib/string";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { getANimeInfos2 } from "@/lib/api/animes2";
import { AppSkeleton } from "@/components/atoms/AppSkeleton";
import { Episode2 } from "@/lib/types/entities2";
import { EpisodeItem, EpisodeItemSKeleton } from "@/components/atoms/EpisodeListItem";
import { AnimeStore, useFavouritesStore } from "@/lib/store/useFavouritesStore";

export default function Page() {
  let { id_image_title } = useLocalSearchParams<{ id_image_title: string }>();

  const { id, title, image } = useMemo(() => {
    const [id, image, title] = extractsArgs(id_image_title);
    return { id, title, image };
  }, [id_image_title]);

  const navigation = useNavigation();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const animeQuery = useQuery({
    queryKey: ["animes", id],
    queryFn: async () => await getANimeInfos2({ id }),
  });
  const { isFaourite, toggleFavourite, items: favourites } = useFavouritesStore();

  function LikeButton() {

   
    return (
      <Pressable
        className="overflow-hidden items-center justify-center bg-white w-[30] h-[30] z-[50]"
        onPress={() => {
          toggleFavourite({
            animeId: id,
            animeImg: animeQuery.data?.animeImg,
            animeTitle: animeQuery.data?.animeTitle,
            totalEpisodes: animeQuery.data?.totalEpisodes,
          });
        }}
        style={{
          borderRadius: 20
        }}
      >
        <Ionicons
          name={isFaourite(id) ? "heart" : "heart-outline"}
          text="Favourite"
          size={22}
        />
      </Pressable>
    );
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      //   headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[
            {
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 100,
              backgroundColor: "#fff",
            },
            headerAnimatedStyle,
          ]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View className="flex-row items-center gap-1">
          <TouchableOpacity className="bg-white flex-row items-center justify-center h-[40] w-[40] rounded-[50]">
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="bg-white flex-row items-center justify-center h-[40] w-[40] rounded-[50]"
          >
            <Ionicons name="search-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <LikeButton />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          className="bg-white flex-row items-center justify-center  rounded-[50]"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, [favourites]);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    } as any;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  const [reversed, setReversed] = useState(false);

  return (
    <View className="flex-1">
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 105 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[{ height: IMG_HEIGHT, width }, imageAnimatedStyle]}
        >
          <Animated.View sharedTransitionTag={id} className="px-4">
            <View className="max-w-full">
              <View className="flex-row items-center gap-2">
                <Image
                  placeholder={BLUR_HASH}
                  source={{
                    uri: animeQuery.data?.animeImg || image,
                  }}
                  style={{
                    width: 140,
                    borderRadius: 5,
                    height: 200,
                  }}
                />
                <View className="flex-1">
                  <Text className="text-[17px] font-bold w-full">
                    {substring(animeQuery.data?.animeTitle || title, 55)}
                  </Text>
                  <View className="mt-3 gap-2 flex-1">
                    {animeQuery.isLoading ? (
                      <View className="gap-2">
                        <DetailRowSkeleton />
                        <DetailRowSkeleton />
                        <DetailRowSkeleton />
                        <DetailRowSkeleton />
                        <DetailRowSkeleton />
                      </View>
                    ) : (
                      <>
                        <DetailRow label="Type" value={animeQuery.data?.type} />
                        <DetailRow
                          label="Status"
                          value={animeQuery.data?.otherNames
                            ?.replaceAll(" ", "")
                            .replaceAll("\n", "")
                            .replace("Status:", "")
                            .trim()}
                        />
                        <DetailRow
                          label="Genre"
                          value={animeQuery.data?.releasedDate.replaceAll(
                            "Genre:",
                            ""
                          )}
                        />
                        <DetailRow
                          label="Episodes count"
                          value={animeQuery.data?.totalEpisodes}
                        />
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
          <View className="flex-row items-center gap-2 justify-between px-3 mt-2">
            <Text className="font-bold text-xl">Episodes list</Text>
            <TouchableOpacity
              onPress={() => setReversed((v) => !v)}
              className="border-black border bg-white rounded-md py-1 px-2 flex-row gap-1 items-center"
            >
              <Text className="font-bold">A-Z</Text>
              <Ionicons
                name={reversed ? "arrow-up" : "arrow-down"}
                size={18}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View className="bg-white px-3 gap-1">
         
          {animeQuery.isLoading ? (
            <>
              {Array.from({ length: 40 }).map((_, i) => (
                <EpisodeItemSKeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {reversed &&
                animeQuery.data?.episodesList.map((e) => (
                  <EpisodeItem key={e.episodeId} episode={e} />
                ))}

              {!reversed &&
                animeQuery.data?.episodesList.map((e) => (
                  <EpisodeItem key={e.episodeId} episode={e} />
                )).reverse()}
            </>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const IMG_HEIGHT = 240;
const { width } = Dimensions.get("screen");

function DetailRow({ label, value }: { label: string; value: string }) {
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

function DetailRowSkeleton() {
  return (
    <AppSkeleton>
      <View style={{ width: "100%", height: 15, borderRadius: 15 }} />
    </AppSkeleton>
  );
}

