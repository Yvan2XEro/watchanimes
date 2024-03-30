import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { substring } from "@/lib/string";
import { Anime } from "@/lib/types/entities";

type TProps = {
  onPress: () => void;
  data: Anime;
};
export default function AnimeItem(props: TProps) {
  const { onPress, data } = props;
  return (
    <TouchableOpacity onPress={onPress} className="w-max max-w-[150] h-[255]">
      <Image
        source={{
          uri: data.image,
        }}
        style={{
          width: 150,
          height: 212,
        }}
      />
      <Text className="text-base tracking-tighter font-bold shrink">
        {substring(data.title, 30)}
      </Text>
    </TouchableOpacity>
  );
}

