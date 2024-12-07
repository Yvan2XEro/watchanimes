import { SLASH_REPLACE } from "@/lib/constants";
import { argsToMultiparams } from "@/lib/string";
import { Anime2 } from "@/lib/types/entities2";
import { FlashList } from "@shopify/flash-list";
import { Link, router } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import { AnimeItem2, AnimeItemSkeleton } from "./AnimeItem2";

type TProps = {
  genre?: string;
  title: string;
  right?: ReactNode;
  fetchData: () => Promise<Anime2[]>;
};
export default function AnimesSection2({
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
        data={animesQuery.data}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={150}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <AnimeItem2 data={item} onPress={() => router.push(`/animes/details/${argsToMultiparams(item.animeId, item.animeImg, item.animeTitle)}`)} />
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
