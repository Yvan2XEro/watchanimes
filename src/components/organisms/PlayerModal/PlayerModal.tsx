import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useVideoProvider } from "@/contexts/providers/video-provider";
import { useIsInsideTabNavigator } from "@/lib/hooks/useIsInsideTabNavigator";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { useFavouritesStore } from "@/lib/store/useFavouritesStore";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { shadowStyle } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { VideoView } from "expo-video";

import React, { useEffect } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlayerModal() {
  const { items } = useFavouritesStore();

  const pathName = usePathname();

  const { status, playAnime, setAnime, currentPlaying, setStatus } =
    usePlayerStatusStore();

  const insets = useSafeAreaInsets();
  const isInsideTab = useIsInsideTabNavigator();
  const { height, width } = useWindowDimensions();
  const bottom = useSharedValue(0);
  const { text } = useThemeColor();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: withSpring(bottom.value),
    };
  });

  useEffect(() => {
    bottom.value = isInsideTab ? insets.bottom + 49 + 10 : insets.bottom + 20;
  }, [isInsideTab, insets.bottom]);

  if (!currentPlaying || status === "maximised") return null;
  const { player } = useVideoProvider();

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          zIndex: 400,
          left: 8,
          right: 8,
          maxWidth: width - 16,
        },
        animatedStyle,
        shadowStyle(text),
      ]}
      className="bg-card rounded-md"
    >
      <View className="flex flex-row w-full p-1">
        <Pressable
          onPress={() => setStatus("maximised")}
          className="w-[35%] min-h-[65]"
        >
          {/* <Image
            source={{ uri: currentPlaying?.animeImg }}
            style={{ width: "100%", height: "100%" }}
          /> */}
          <VideoView
            style={{ width: "100%", aspectRatio: 16 / 9, alignSelf: "center" }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          ;
        </Pressable>
        <Pressable
          onPress={() => setStatus("maximised")}
          className="px-1 w-[40%]"
        >
          <Text className="text-sm">{currentPlaying.animeTitle}</Text>
          <Text className="text-xs text-primary">
            Episode {currentPlaying.episodeNum}
          </Text>
        </Pressable>

        <View className=" items-center justify-center" style={{ width: "25%" }}>
          <View className="flex flex-row items-center">
            <Button
              variant="ghost"
              size="icon"
              onPress={() => {
                if (!player.playing) {
                  return player.play();
                }
                return player.pause();
              }}
              className="flex-1 items-center"
            >
              <Ionicons
                name={!player.playing ? "play-outline" : "pause-outline"}
                size={30}
                color={text}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onPress={() => setAnime(null)}
              className="flex-1 items-center"
            >
              <Ionicons name="close-outline" size={30} color={text} />
            </Button>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
