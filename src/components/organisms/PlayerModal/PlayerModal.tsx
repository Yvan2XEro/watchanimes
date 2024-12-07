import { useFavouritesStore } from "@/lib/store/useFavouritesStore";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function PlayerModal() {
  const { items } = useFavouritesStore();

  const { status, playAnime, setAnime, currentPlaying, setStatus } =
    usePlayerStatusStore();

  const translateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    top: 100 + translateY.value,
  }));
  const gestureHandler = Gesture.Pan()
    .onStart(({ y }) => {
      translateY.value -= y;
    })
    .onUpdate(({ translationY }) => {
      translateY.value = translationY;
    });

  if (!currentPlaying || status=== "maximised") return null;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          zIndex: 400,
          left: 0,
          right: 0,
          bottom: 0,
        },
      ]}
      className="bg-white"
    >
      <View className="flex flex-row">
        <Pressable
          onPress={() => setStatus("maximised")}
          style={{ width: "35%", height: 65 }}
        >
          <Image
            source={{ uri: currentPlaying?.animeImg }}
            style={{ width: "100%", height: "100%" }}
          />
        </Pressable>
        <Pressable
          onPress={() => setStatus("maximised")}
          style={{ width: "40%", height: 65 }}
          className="px-1"
        >
          <Text className="text-sm font-bold">{currentPlaying.animeTitle}</Text>
          <Text className="text-lg">
            Episode {currentPlaying.episodeNum}
          </Text>
        </Pressable>

        <View className=" items-center justify-center" style={{ width: "25%" }}>
          <View className="flex flex-row items-center">
            <TouchableOpacity
              onPress={() => playAnime(currentPlaying)}
              className="flex-1 items-center"
            >
              <Ionicons name="pause-outline" size={30} />
              {/* <Ionicons name="play-outline" size={30} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAnime(null)}
              className="flex-1 items-center"
            >
              <Ionicons name="close-outline" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
