import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { substring } from "@/lib/string";
import { Link } from "expo-router";
import { NewRelease, TopAiring } from "@/lib/types/entities";

type TProps = {
  onPress: () => void;
  data: TopAiring
};
export default function TopAiringSwiperItem(props: TProps) {
  const {  onPress, data} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{
          uri: data.image,
        }}
        style={{
          width: 300,
          height: 150,
        }}
      />
      <Text className="text-base tracking-tighter font-bold">
        {substring(data.title, 40)}
      </Text>
      
    </TouchableOpacity>
  );
}
