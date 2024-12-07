import { Item, ItemSkeleton } from "@/components/organisms/AnimeSection";
import { searchAnimes } from "@/lib/api/animes";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { Anime } from "@/lib/types/entities";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useInfiniteQuery } from "react-query";
const { width } = Dimensions.get("window");

export default function OtherAnimes() {
  const { status, setStatus, setAnime } = usePlayerStatusStore();

  const animesQuery = useInfiniteQuery({
    queryKey: ["animes", "others"],
    queryFn: async ({ pageParam = 1 }) =>
      searchAnimes({
        page: pageParam,
        q: "others",
      }),
    getNextPageParam(lastPage, pages) {
      return lastPage.hasNextPage ? pages.length : undefined;
    },
  });

  function RenderContent() {
    if (animesQuery.isLoading)
      return (
        <FlatList
          data={Array.from({ length: 20 })}
          renderItem={() => <ItemSkeleton />}
          refreshing={animesQuery.isRefetching}
          numColumns={Math.round(width / 180)}
          ItemSeparatorComponent={() => <View className="h-1" />}
          contentContainerStyle={{
            alignItems: "center",
          }}
          onRefresh={async () => await animesQuery.refetch()}
          keyExtractor={(item, index) => index + ""}
        />
      );

    return (
      <FlatList<Anime>
        data={animesQuery.data?.pages.flatMap((page) => page.results)}
        renderItem={(props) => (
          <Item
            {...{
              ...props,
              onPress() {
                setStatus("minimised")
                setAnime(null);
              },
            }}
          />
        )}
        refreshing={animesQuery.isRefetching && !animesQuery.isFetchingNextPage}
        numColumns={Math.round(width / 180)}
        ItemSeparatorComponent={() => <View className="h-1" />}
        contentContainerStyle={{
          alignItems: "center",
        }}
        onRefresh={async () => await animesQuery.refetch()}
        keyExtractor={(item, index) => index + item.id}
        onEndReached={() => {
          if (animesQuery.hasNextPage && !animesQuery.isFetchingNextPage) {
            animesQuery.fetchNextPage();
          }
        }}
      />
    );
  }

  return (
    <View className="bg-white flex-1 px-3">
      <RenderContent />
    </View>
  );
}
