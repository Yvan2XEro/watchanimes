import {
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import {
  getANimeInfos2,
  getEpisodeStreamingLink,
  getRecentRelease2,
} from "@/lib/api/animes2";
import { Ionicons } from "@expo/vector-icons";
import { BLUR_HASH, PRIMARY, WEB_APP_URL } from "@/lib/constants";
import { Image } from "expo-image";
import VideoPlayer from "expo-video-player";
import { AppSkeleton } from "@/components/atoms/AppSkeleton";
import { substring } from "@/lib/string";
import { AnimesSection2 } from "@/components/organisms/AnimeSection2";
import { AnimesSection } from "@/components/organisms/AnimeSection";
import { getPopular } from "@/lib/api/animes";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useAppBottomSheet } from "@/contexts/providers/app-bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  EpisodeItem,
  EpisodeItemSKeleton,
} from "@/components/atoms/EpisodeListItem";
import { useFavouritesStore } from "@/lib/store/useFavouritesStore";
import { useKeepAwake } from "expo-keep-awake";
import { useRecentsViewsStore } from "@/lib/store/useRecentsViewsStore";
import { shareIpisode } from "@/lib/utils";

export default function watch() {
  const { top } = useSafeAreaInsets();
  useKeepAwake();
  const { id } = useLocalSearchParams<{ id: string }>();
  // const id = "naruto-episode-220";
  const [fullscreen, setFullscreen] = React.useState(false);
  const animeId = useMemo(() => {
    return id.split("-episode-")[0];
  }, [id]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const episodeQuery = useQuery({
    queryKey: ["episode", id],
    queryFn: () => getEpisodeStreamingLink({ id: id }),
  });
  const animeQuery = useQuery({
    queryKey: ["animes", animeId],
    queryFn: async () => await getANimeInfos2({ id: animeId }),
  });

  const videoRef = React.useRef<Video>(null);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const animeViewStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollOffset.value,
      [0, 120], // Intervalles de la hauteur souhaitée
      [120, 0], // Intervalles de la hauteur cible
      "clamp" // Option pour empêcher la valeur de dépasser les limites
    ),
  }));

  const { presentAppBottomSheet } = useAppBottomSheet();
  const { addToRecents } = useRecentsViewsStore();

  const presentEpisodesList = () => {
    presentAppBottomSheet(
      <BottomSheetScrollView>
        <View className="px-3 gap-1">
          {animeQuery.isLoading ? (
            <>
              {Array.from({ length: 40 }).map((_, i) => (
                <EpisodeItemSKeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {animeQuery.data?.episodesList.map((e) => (
                <EpisodeItem key={e.episodeId} episode={e} />
              ))}
            </>
          )}
        </View>
      </BottomSheetScrollView>
    );
  };

  function LikeButton() {
    const { isFaourite, toggleFavourite } = useFavouritesStore();

    return (
      <ActionButton
        iconName={isFaourite(animeId) ? "heart" : "heart-outline"}
        text="Favourite"
        onPress={() => {
          if (!animeQuery.data) return;
          const { animeImg, animeTitle, totalEpisodes } = animeQuery.data;
          toggleFavourite({ animeId, animeImg, animeTitle, totalEpisodes });
        }}
      />
    );
  }

  const OthersAnimes = useMemo(
    () => (
      <>
        <AnimesSection2
          title="Recent release"
          fetchData={() =>
            getRecentRelease2({
              page: 1,
            })
          }
        />
        <AnimesSection
          title="Popular"
          fetchData={() =>
            getPopular({
              page: 1,
            })
          }
        />
      </>
    ),
    []
  );

  return (
    <View style={{ top }} className="flex-1">
      <View className="h-[200] max-h-[200] relative flex-1 ">
        {episodeQuery.isLoading ? (
          <ViedeoPlaceholder />
        ) : (
          <VideoPlayer
            videoProps={{
              source: {
                uri: episodeQuery.data?.sources?.[0].file,
              },
              shouldPlay: true,
              resizeMode: ResizeMode.CONTAIN,
              useNativeControls: false,
              onReadyForDisplay(event) {
                addToRecents({
                  animeId,
                  animeImg: animeQuery.data.animeImg,
                  animeTitle: animeQuery.data.animeTitle,
                  episodeId: id,
                  totalEpisodes: animeQuery.data.totalEpisodes,
                });
              },
              ref: videoRef,
            }}
            style={{ height: 200 }}
            slider={{
              minimumTrackTintColor: "#ffffff",
              thumbTintColor: "#ffffff",
            }}
            fullscreen={{
              visible: true,
              enterFullscreen() {
                setFullscreen((v) => !v);
                videoRef.current.setStatusAsync({
                  shouldPlay: true,
                });
              },

              exitFullscreen() {
                setFullscreen((v) => !v);
                videoRef.current.setStatusAsync({
                  shouldPlay: false,
                });
              },
              inFullscreen: fullscreen,
            }}
          />
        )}
      </View>
      <View className="gap-2 mt-3 flex-1">
        <View>
          <View className="flex-row px-1 items-center justify-between">
            <Text className="font-bold text-xl">
              Episode {id.split("-episode-")?.[1]}
            </Text>
            <TouchableOpacity className="p-2" onPress={presentEpisodesList}>
              <Ionicons name="list-outline" size={24} color={PRIMARY} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-evenly">
            <LikeButton />
            <ActionButton iconName="share" text="Share" onPress={() => shareIpisode(`${WEB_APP_URL}/watch/${id}`)} />
            <ActionButton
              iconName="download"
              text="Download"
              onPress={() => {}}
            />
          </View>
        </View>

        <Animated.ScrollView ref={scrollRef} style={{ flex: 1 }}>
          <Animated.View
            style={[animeViewStyle, { overflow: "hidden" }]}
            className="flex-row items-center gap-1 bg-white px-2 "
          >
            <Image
              source={{ uri: animeQuery.data?.animeImg }}
              placeholder={BLUR_HASH}
              style={{
                width: 70,
                borderRadius: 5,
                height: 100,
              }}
            />
            {animeQuery.isLoading ? (
              <AppSkeleton style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={{ borderRadius: 5, height: 15, width: "100%" }} />
                <View
                  style={{
                    borderRadius: 5,
                    height: 15,
                    width: "100%",
                    marginTop: 3,
                  }}
                />
                <View
                  style={{
                    borderRadius: 5,
                    height: 15,
                    width: "100%",
                    marginTop: 3,
                  }}
                />
                <View
                  style={{
                    borderRadius: 5,
                    height: 15,
                    width: "100%",
                    marginTop: 3,
                  }}
                />
              </AppSkeleton>
            ) : (
              <View className="px-[10] flex-1 items-start">
                <Text className="font-bold text-xl max-w-full shrink flex-wrap">
                  {substring(animeQuery.data?.animeTitle, 45)}
                </Text>
                <Text className="font-bold color-violet-600">
                  {animeQuery.data?.type}
                </Text>
                <Text>
                  {animeQuery.data?.otherNames
                    .replaceAll("\n", "")
                    .replaceAll(" ", "")
                    .replaceAll("Status:", "")}
                </Text>
              </View>
            )}
          </Animated.View>
          {OthersAnimes}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
function ActionButton({ iconName, text, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-2 rounded-lg flex-row items-center gap-2"
    >
      <Ionicons name={iconName} color={"#000000"} size={20} />
      <Text className="font-bold">{text}</Text>
    </TouchableOpacity>
  );
}

function ViedeoPlaceholder() {
  return (
    <View className="w-full h-full inset-0 bg-black flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
