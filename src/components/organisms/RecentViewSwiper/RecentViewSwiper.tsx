import { Text } from "@/components/ui/text";

import { AppLoader } from "@/components/atoms/AppLoader";
import { getNews } from "@/lib/api/news";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { useQuery } from "react-query";
import RecentSliderItem from "./RecentSliderItem";

export default function RecentViewSwiper() {
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
        renderItem={({item}) => (
          <RecentSliderItem
            title={item.title}
            image={item.thumbnail}
            episode={2}
            onPress={() => {}}
          />
        )}
      />
    );
  }
  return null
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text role="heading" className="text-xl tracking-tighter">
        Continue watching
      </Text>

      <ContentWithLoader />
    </View>
  );
}
