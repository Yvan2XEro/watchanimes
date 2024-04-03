import { View, FlatList, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SLASH_REPLACE } from "@/lib/constants";
import { Anime } from "@/lib/types/entities";
import { useInfiniteQuery } from "react-query";
import { getAnimesByGenre } from "@/lib/api/animes";
import { AppLoader } from "@/components/atoms/AppLoader";
import { Item, ItemSkeleton } from "@/components/organisms/AnimeSection";
import { FlashList } from "@shopify/flash-list";

const { width } = Dimensions.get("window");
export default function animesIindex() {
  const navigation = useNavigation();
  const { genre } = useLocalSearchParams<{ genre: string }>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery(
    ["animes", genre],
    ({ pageParam = 1 }) => {
      return getAnimesByGenre({
        genre: genre.split(SLASH_REPLACE)[0],
        page: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasNextPage ? pages.length : undefined,
    }
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: genre.split(SLASH_REPLACE)[1],
    });
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 px-3">
        <FlatList
          data={Array.from({ length: 20 })}
          renderItem={() => <ItemSkeleton />}
          refreshing={isRefetching}
          numColumns={Math.round(width / 180)}
          ItemSeparatorComponent={() => <View className="h-1" />}
          contentContainerStyle={{
            alignItems: "center",
          }}
          onRefresh={async () => await refetch()}
          ListFooterComponent={isFetchingNextPage ? <AppLoader /> : null}
          keyExtractor={(item, index) => index + ""}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      </View>
    );

  return (
    <View className="flex-1 px-2">
      <FlashList<Anime>
        data={data?.pages.flatMap((page) => page.results)}
        renderItem={(props) => <Item {...props} />}
        refreshing={isRefetching && !isFetchingNextPage}
        numColumns={Math.round(width / 180)}
        estimatedItemSize={150}
        ItemSeparatorComponent={() => <View className="h-1" />}
        onRefresh={async () => await refetch()}
        ListFooterComponent={isFetchingNextPage && <AppLoader />}
        keyExtractor={(item, index) => index + item.id}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
}
