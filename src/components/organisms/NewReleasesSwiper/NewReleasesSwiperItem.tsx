import { Text } from "@/components/ui/text";
import { substring } from "@/lib/string";
import { NewRelease } from "@/lib/types/entities";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

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
