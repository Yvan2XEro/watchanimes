import { Text } from "@/components/ui/text";

import { substring } from "@/lib/string";
import { TopAiring } from "@/lib/types/entities";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

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
