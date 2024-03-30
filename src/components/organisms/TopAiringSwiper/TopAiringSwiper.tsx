import { View, Text } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import TopAiringSwiperItem from "./TopAiringSwiperItem";
import { useQuery } from "react-query";
import { getNews } from "@/lib/api/news";
import { AppLoader } from "@/components/atoms/AppLoader";
import { SLASH_REPLACE } from "@/lib/constants";
import { getTopAiring } from "@/lib/api/animes";

export default function TopAiringSwiper() {
  const newQuery = useQuery({
    queryKey: ["top-airing"],
    queryFn: async () => await getTopAiring({}),
  });

  function ContentWithLoader() {
    if (newQuery.isLoading) return <AppLoader />;

    return (
      <FlashList
        horizontal
        data={newQuery.data?.results}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <TopAiringSwiperItem
            data={item}
            onPress={() =>
              router.push(`/news/${item.id.replaceAll("/", SLASH_REPLACE)}`)
            }
          />
        )}
      />
    );
  }
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View className="flex flex-row items-center justify-between">
        <Text role="heading" className="text-xl tracking-tighter">
          Top airing
        </Text>
        <Link href="/news">More</Link>
      </View>

      <ContentWithLoader />
    </View>
  );
}
