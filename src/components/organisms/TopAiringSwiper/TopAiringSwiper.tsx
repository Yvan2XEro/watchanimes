import { Text } from "@/components/ui/text";

import { AppLoader } from "@/components/atoms/AppLoader";
import { getTopAiring } from "@/lib/api/animes";
import { SLASH_REPLACE } from "@/lib/constants";
import { FlashList } from "@shopify/flash-list";
import { Link, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useQuery } from "react-query";
import TopAiringSwiperItem from "./TopAiringSwiperItem";

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
