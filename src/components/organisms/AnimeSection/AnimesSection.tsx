import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Link, router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import TopAiringSwiperItem from "./AnimeItem";
import { useQuery } from "react-query";
import { AppLoader } from "@/components/atoms/AppLoader";
import { SLASH_REPLACE } from "@/lib/constants";
import { Anime, Paginated } from "@/lib/types/entities";

type TProps = {
  genre: string;
  title: string
  right?: ReactNode
  fetchData: () => Promise<Paginated<Anime>>;
};
export default function AnimesSection({ fetchData, genre, title,right }: TProps) {
  
  const animesQuery = useQuery({
    queryKey: [genre.toLowerCase()],
    keepPreviousData: true,
    queryFn: fetchData,
  });

  function ContentWithLoader() {
    if (animesQuery.isLoading) return <AppLoader />;

    return (
      <FlashList
        horizontal
        data={animesQuery.data?.results}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <TopAiringSwiperItem
            data={item}
            onPress={() =>
              router.push(`/animes`)
            }
          />
        )}
      />
    );
  }
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View className="flex flex-row items-center justify-between">
        <Text role="heading" className="text-xl tracking-tighter my-2">
          {title}
        </Text>
        {right}
      </View>

      <ContentWithLoader />
    </View>
  );
}
