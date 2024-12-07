import { AppSkeleton } from "@/components/atoms/AppSkeleton";
import { LikeButton } from "@/components/atoms/LikeButton";
import { BLUR_HASH } from "@/lib/constants";
import { argsToMultiparams, substring } from "@/lib/string";
import { Anime } from "@/lib/types/entities";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

type TProps = {
  onPress: () => void;
  data: Anime;
};
export function AnimeItem(props: TProps) {
  const { onPress, data } = props;

  return (
    <Animated.View
      sharedTransitionTag={data.id}
      style={{ position: "relative" }}
    >
      <TouchableOpacity
        onPress={onPress}
        className="w-full max-w-[150] h-[255] relative"
      >
        <LikeButton
          animeId={data.id}
          animeImg={data.image}
          animeTitle={data.title}
          totalEpisodes={null}
        />
        <Image
          placeholder={BLUR_HASH}
          source={{
            uri: data.image,
          }}
          style={{
            width: 150,
            borderRadius: 5,
            height: 212,
          }}
        />
        <Text className="text-base tracking-tighter font-bold shrink">
          {substring(data.title, 30)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function AnimeItemSkeleton() {
  return (
    <AppSkeleton>
      <View
        style={{
          width: 150,
          height: 212,
          borderRadius: 5,
        }}
      />
      <View
        style={{
          width: 150,
          marginTop: 10,
          borderRadius: 20,
          height: 15,
        }}
      />
    </AppSkeleton>
  );
}

export const Item = ({
  item,
  onPress,
}: {
  item: Anime;
  onPress?: () => void;
}) => (
  <Animated.View
    sharedTransitionTag={item.id}
    style={{ margin: 10, maxWidth: 160, width: 160 }}
  >
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        router.push(
          `/animes/details/${argsToMultiparams(
            item.id,
            item.image,
            item.title
          )}`
        );
      }}
      className="flex-1 relative"
    >
      <LikeButton
        animeId={item.id}
        animeImg={item.image}
        animeTitle={item.title}
        totalEpisodes={null}
      />
      <Image
        source={{ uri: item.image }}
        placeholder={BLUR_HASH}
        style={{
          width: 160,
          borderRadius: 5,
          height: 247,
        }}
      />
      <View className="flex-1 items-center">
        <Text className=" text-base tracking-tighter font-bold shrink max-w-full">
          {substring(item.title, 40)}
        </Text>
      </View>
    </TouchableOpacity>
  </Animated.View>
);
export const ItemSkeleton = React.memo(() => (
  <AppSkeleton style={{ margin: 10 }}>
    <View
      style={{
        width: 170,
        height: 247,
        borderRadius: 5,
      }}
    />
    <View
      style={{
        width: 170,
        marginTop: 10,
        borderRadius: 20,
        height: 15,
      }}
    />
  </AppSkeleton>
));
