import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Link, router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { AnimeItem, AnimeItemSkeleton } from "./AnimeItem";
import { useQuery } from "react-query";
import { AppLoader } from "@/components/atoms/AppLoader";
import { SLASH_REPLACE } from "@/lib/constants";
import { Anime, Paginated } from "@/lib/types/entities";
import { argsToMultiparams } from "@/lib/string";

type TProps = {
  genre?: string;
  title: string;
  right?: ReactNode;
  fetchData: () => Promise<Paginated<Anime>>;
};
export default function AnimesSection({
  fetchData,
  genre,
  title,
  right,
}: TProps) {
  const animesQuery = useQuery({
    queryKey: [(genre || title).toLowerCase()],
    keepPreviousData: true,
    queryFn: fetchData,
  });

  function ContentWithLoader() {
    if (animesQuery.isLoading) return (
      <FlashList
        horizontal
        data={Array.from({length: 20})}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={150}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={() => (
          <AnimeItemSkeleton />
        )}
      />
    );

    return (
      <FlashList
        horizontal
        data={animesQuery.data?.results}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={150}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <AnimeItem data={item} onPress={() => router.push(`/animes/details/${argsToMultiparams(item.id, item.image, item.title)}`)} />
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
        {!!genre ? (
          <Link
            className="text-violet-600"
            href={`/animes/${
              genre + SLASH_REPLACE + genre[0].toUpperCase() + genre.slice(1)
            }`}
          >
            See more
          </Link>
        ) : (
          right
        )}
      </View>
      <ContentWithLoader />
    </View>
  );
}
