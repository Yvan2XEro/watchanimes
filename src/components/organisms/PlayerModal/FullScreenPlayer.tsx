import { AppSheetBackdrop } from "@/components/atoms/AppSheetBackdrop";
import { Text } from "@/components/ui/text";
import { getANimeInfos2, getEpisodeStreamingLink } from "@/lib/api/animes2";
import { BLUR_HASH } from "@/lib/constants";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { useRecentsViewsStore } from "@/lib/store/useRecentsViewsStore";
import { substring } from "@/lib/string";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useMemo, useRef } from "react";
import { BackHandler, useWindowDimensions, View } from "react-native";
import { useQuery } from "react-query";
import { EpisodesList } from "../EpisodesList";
import OtherAnimes from "./OtherAnimes";
import { ViedeoPlaceholder } from "./ViedeoPlaceholder";

export default function FullScreenPlayer() {
  const { status, setStatus, currentPlaying } = usePlayerStatusStore();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const episodeQuery = useQuery({
    queryKey: ["episode", currentPlaying?.episodeId],
    enabled: !!currentPlaying,
    queryFn: () => getEpisodeStreamingLink({ id: currentPlaying?.episodeId }),
  });
  const animeId = currentPlaying?.episodeId.split("-episode-")[0];
  const animeQuery = useQuery({
    queryKey: ["animes", animeId],
    queryFn: async () => await getANimeInfos2({ id: animeId }),
    enabled: !!animeId,
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (status === "maximised") {
      return bottomSheetModalRef.current?.present();
    }
    if (status === "minimised") {
      return bottomSheetModalRef.current?.close();
    }
  }, [status]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (status === "maximised") {
          bottomSheetModalRef.current?.close();
          return true;
        }
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [status]);
  const { addToRecents } = useRecentsViewsStore();
  const player = useVideoPlayer(
    episodeQuery.data?.sources?.[0].file,
    (player) => {
      player.loop = true;
      player.play();
      if (currentPlaying)
        addToRecents({
          animeId,
          animeImg: currentPlaying.animeImg,
          animeTitle: currentPlaying.animeTitle,
          episodeId: currentPlaying?.episodeId,
          totalEpisodes: null,
        });
    }
  );
  const OthersAnimes = useMemo(() => <OtherAnimes />, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={["100%"]}
      index={0}
      onDismiss={() => {
        setStatus("minimised");
      }}
      backdropComponent={(props) => <AppSheetBackdrop {...props} />}
      backgroundStyle={{
        borderRadius: 0,
        backgroundColor: colors.background,
        paddingTop: 0,
      }}
      handleIndicatorStyle={{
        height: 0,
      }}
    >
      <View className="h-[200] max-h-[200] relative flex-1 ">
        {!!episodeQuery.data && (
          // <Video
          //   style={{ width: "100%", aspectRatio: 16 / 9, alignSelf: "center" }}
          //   source={{ uri: episodeQuery.data?.sources?.[0].file }}
          //   posterStyle={{
          //     resizeMode: "cover",
          //   }}
          //   shouldPlay={false}
          //   posterSource={{ uri: currentPlaying?.animeImg }}
          //   usePoster={false}
          //   useNativeControls
          //   onReadyForDisplay={(event) => {
          //     addToRecents({
          //       animeId,
          //       animeImg: currentPlaying.animeImg,
          //       animeTitle: currentPlaying.animeTitle,
          //       episodeId: currentPlaying?.episodeId,
          //       totalEpisodes: null,
          //     });
          //   }}
          // />
          <VideoView
            style={{ width: "100%", aspectRatio: 16 / 9, alignSelf: "center" }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        )}
        {episodeQuery.isLoading && <ViedeoPlaceholder />}
      </View>
      <BottomSheetScrollView className="gap-3 bg-card">
        <View className="flex-row items-center gap-1 bg-card px-2 py-3">
          <Image
            source={{ uri: currentPlaying?.animeImg }}
            placeholder={BLUR_HASH}
            style={{
              width: (70 * 75) / 100,
              borderRadius: 5,
              height: 75,
            }}
          />
          <View>
            <Text className="font-bold text-xl">
              Episode {currentPlaying?.episodeId?.split("-episode-")?.[1]}
            </Text>
            <Text className="font-bold text-xl max-w-full shrink flex-wrap">
              {substring(currentPlaying?.animeTitle, 45)}
            </Text>
          </View>
        </View>
        <EpisodesList
          anime={animeQuery.data}
          isLoading={animeQuery.isLoading}
          latestEpisode={currentPlaying?.episodeId}
        />
        {/* {OthersAnimes} */}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
