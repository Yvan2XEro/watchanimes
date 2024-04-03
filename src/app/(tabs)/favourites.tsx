import { Item } from "@/components/organisms/AnimeSection";
import { useFavouritesStore } from "@/lib/store/useFavouritesStore";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Dimensions, FlatList } from "react-native";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Content />
    </View>
  );
}

function Content() {
  const { items } = useFavouritesStore();
  return (
    <View className="flex-1">
      <FlashList
        data={Object.entries(items)
          .map(([_, anime]) => anime)
          .filter((a) => !!a)}
        renderItem={({ item }) => (
          <View >
            <Item
            item={{
              id: item.animeId,
              image: item.animeImg,
              title: item.animeTitle,
              releaseDate: "",
              url: ""
            }}
          />
          </View>
        )}
        numColumns={Math.round(width / 180)}
        // ItemSeparatorComponent={() => <View className="h-1" />}
        contentContainerStyle={{
          // alignItems: "center",

        }}
        estimatedItemSize={150}
        keyExtractor={(item, index) => index + item.animeId}
      />
    </View>
  );
}
const { width } = Dimensions.get("window");
