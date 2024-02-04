import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import RecentSliderItem from "./RecentSliderItem";

export default function RecentViewSwiper() {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text role="heading" className="text-2xl tracking-tighter">
        Continue watching
      </Text>

      <FlashList
        horizontal
        data={[1, 2, 3, 4, 5, 6]}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={() => (
          <RecentSliderItem
            title="She professed herself the pupil of the wise man."
            image="https://img.flawlessfiles.com/_r/300x400/100/31/cc/31cc09da5bc793e7327f114618444142/31cc09da5bc793e7327f114618444142.jpg"
            episode={2}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
}
