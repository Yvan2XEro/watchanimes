import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { substring } from "@/lib/string";

type TProps = {
  onPress: () => void;
  image: string;
  title: string;
  episode?: number;
};
export default function RecentSliderItem({
  image,
  onPress,
  title,
  episode,
}: TProps) {
  return (
    <TouchableOpacity   onPress={onPress}>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 300,
          height: 150,
          // borderRadius: 15,
          objectFit: "cover",
        }}
      />
      <Text className="text-base tracking-tighter">{substring(title, 32)}</Text>
      {!!episode && (
        <Text className="text-base text-gray-500 tracking-tighter">
          Episode {episode}
        </Text>
      )}
    </TouchableOpacity>
  );
}
