import { AppLoader } from "@/components/atoms/AppLoader";
import { Text } from "@/components/ui/text";
import { getNews } from "@/lib/api/news";
import { SLASH_REPLACE } from "@/lib/constants";
import { FlashList } from "@shopify/flash-list";
import { Link, router } from "expo-router";
import React from "react";
import { View, } from "react-native";
import { useQuery } from "react-query";
import NewReleasesSwiperItem from "./NewReleasesSwiperItem";

export default function NewReleasesSwiper() {
  const newQuery = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  function ContentWithLoader() {
    if (newQuery.isLoading) return <AppLoader />;

    return (
      <FlashList
        horizontal
        data={newQuery.data || []}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <NewReleasesSwiperItem
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
          New releases
        </Text>
        <Link className="text-violet-500" href="/news">More</Link>
      </View>

      <ContentWithLoader />
    </View>
  );
}
