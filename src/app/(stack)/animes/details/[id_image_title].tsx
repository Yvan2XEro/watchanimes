import AnimeInfosHeader from "@/components/organisms/AnimeInfosHeader/AnimeInfosHeader";
import { EpisodesList } from "@/components/organisms/EpisodesList";
import { getANimeInfos2 } from "@/lib/api/animes2";
import { WEB_APP_URL } from "@/lib/constants";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { useFavouritesStore } from "@/lib/store/useFavouritesStore";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { useRecentsViewsStore } from "@/lib/store/useRecentsViewsStore";
import { extractsArgs } from "@/lib/string";
import { shareAnime } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useQuery } from "react-query";

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
  const { items: favourites } = useFavouritesStore();
  const { status, setStatus } = usePlayerStatusStore();
  const { text, card } = useThemeColor();

  const onShareAnime = useCallback(() => {
    shareAnime(`${WEB_APP_URL}/animes/details/${id_image_title}`);
  }, [id_image_title]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackground: () => (
        <Animated.View
          style={[
            {
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 100,
              backgroundColor: card,
            },
            headerAnimatedStyle,
          ]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View className="flex-row items-center gap-1">
          <TouchableOpacity
            onPress={onShareAnime}
            className="bg-card flex-row items-center justify-center h-[40] w-[40] rounded-[50]"
          >
            <Ionicons name="share-outline" size={22} color={text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="bg-card flex-row items-center justify-center h-[40] w-[40] rounded-[50]"
          >
            <Ionicons name="search-outline" size={22} color={text} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [favourites, status]);

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

  const { items } = useRecentsViewsStore();

  const lastPlayEpisode = useMemo(() => {
    const anime = Object.values(items).find((anime) => anime.animeId === id);
    if (!anime) return null;

    return anime.episodeId;
  }, [Object.entries(items), id]);

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
            <AnimeInfosHeader
              data={animeQuery.data}
              defaultImage={image}
              defaultTitle={title}
              height={IMG_HEIGHT}
              isLoading={animeQuery.isLoading}
              lastPlayEpisode={lastPlayEpisode}
            />
          </Animated.View>
        </Animated.View>
        <EpisodesList
          anime={animeQuery.data}
          isLoading={animeQuery.isLoading}
          latestEpisode={lastPlayEpisode}
        />
      </Animated.ScrollView>
    </View>
  );
}

const IMG_HEIGHT = 270;
const { width } = Dimensions.get("screen");
