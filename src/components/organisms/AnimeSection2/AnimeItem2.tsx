import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { substring } from "@/lib/string";
import { AppSkeleton } from "@/components/atoms/AppSkeleton";
import { Image } from "expo-image";
import { BLUR_HASH } from "@/lib/constants";
import Animated from "react-native-reanimated";
import { Anime2 } from "@/lib/types/entities2";

type TProps = {
  onPress: () => void;
  data: Anime2;
};
export function AnimeItem2(props: TProps) {
  const { onPress, data } = props;
  return (
    <Animated.View sharedTransitionTag={data.animeTitle}>
      <TouchableOpacity onPress={onPress} className="w-full max-w-[150] h-[255]">
        <Image
          placeholder={BLUR_HASH}
          source={{
            uri: data.animeImg,
          }}
          style={{
            width: 150,
            borderRadius: 5,
            height: 212,
          }}
        />
        <Text className="text-base tracking-tighter font-bold shrink">
          {substring(data.animeTitle, 30)}
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
