import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { substring } from "@/lib/string";
import { Link } from "expo-router";
import { NewRelease } from "@/lib/types/entities";

type TProps = {
  onPress: () => void;
  data: NewRelease
};
export default function NewReleasesSwiperItem(props: TProps) {
  const {  onPress, data} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{
          uri: data.thumbnail,
        }}
        style={{
          width: 300,
          height: 150,
        }}
      />
      <Text className="text-base tracking-tighter font-bold text-violet-600">
        {substring(data.title, 40)}
      </Text>
      
    </TouchableOpacity>
  );
}
