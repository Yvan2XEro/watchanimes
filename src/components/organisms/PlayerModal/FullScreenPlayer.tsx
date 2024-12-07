import { AppSheetBackdrop } from "@/components/atoms/AppSheetBackdrop";
import { getEpisodeStreamingLink } from "@/lib/api/animes2";
import { BLUR_HASH } from "@/lib/constants";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { substring } from "@/lib/string";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { Video } from "expo-av";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { BackHandler, Text, View } from "react-native";
import { useQuery } from "react-query";
import OtherAnimes from "./OtherAnimes";
import { ViedeoPlaceholder } from "./ViedeoPlaceholder";

export default function FullScreenPlayer() {
  const { status, setStatus, currentPlaying } = usePlayerStatusStore();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const episodeQuery = useQuery({
    queryKey: ["episode", currentPlaying?.episodeId],
    enabled: !!currentPlaying,
    queryFn: () => getEpisodeStreamingLink({ id: currentPlaying.episodeId }),
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
      'hardwareBackPress',
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
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [status]);

  const OthersAnimes = useMemo(() => <OtherAnimes />, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={["100%",]}
      index={0}
      onDismiss={() => {
        setStatus("minimised");
      }}
      backdropComponent={(props) => <AppSheetBackdrop {...props} />}
      backgroundStyle={{
        borderRadius: 0,
        backgroundColor: colors.card,
        paddingTop: 0,
      }}
      handleIndicatorStyle={{
        height: 0,
      }}
    >
     <View className="h-[200] max-h-[200] relative flex-1 ">
          {!!episodeQuery.data && (
            <Video
              style={{ width: "100%", aspectRatio: 16 / 9, alignSelf: "center" }}
              source={{ uri: episodeQuery.data?.sources?.[0].file }}
              posterStyle={{
                resizeMode: "cover",
              }}
              shouldPlay={true}
              posterSource={{ uri: currentPlaying?.animeImg }}
              usePoster={false}
              useNativeControls
            />
          )}
          {episodeQuery.isLoading && <ViedeoPlaceholder />}
        </View>
      <BottomSheetScrollView>
        <View className="flex-row items-center gap-1 bg-white px-2 py-3">
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
        {OthersAnimes}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
