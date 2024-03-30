import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { getNews } from "@/lib/api/news";
import { useQuery } from "react-query";
import { Link, router, useNavigation } from "expo-router";
import { MasonryFlashList } from "@shopify/flash-list";
import { NewRelease } from "@/lib/types/entities";
import { BlurView } from "expo-blur";
import { SLASH_REPLACE } from "@/lib/constants";
const { width } = Dimensions.get("window");
const numColumns = Math.round(width / 390);

export default function Page() {
  const newQuery = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "New releases",
    });
  }, []);
  return (
    <View className=" flex-1">
      <MasonryFlashList
        data={newQuery.data}
        estimatedItemSize={200}
        numColumns={numColumns}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        renderItem={({ item, index }) => {
          return <NewItem data={item} index={index} />;
        }}
      />
    </View>
  );
}

function NewItem({ data, index }: { data: NewRelease; index: number }) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/news/${data.id.replaceAll("/", SLASH_REPLACE)}`)
      }
      style={{
        // aspectRatio: index === 0 ? 1 : 2 / 3,
        position: "relative",
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        overflow: "hidden",
      }}
    >
      <Image source={{ uri: data.thumbnail }} style={{ height: 150 }} />
      <BlurView intensity={100} className=" p-1 rounded-md overflow-hidden">
        <Text className="">{data.title}</Text>
        <Text className="rounded p-1 flex flex-row text-sm">
          {data.uploadedAt}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
}
