import { View, Text, Image, FlatList, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SLASH_REPLACE } from "@/lib/constants";
import { Anime } from "@/lib/types/entities";
import { useInfiniteQuery } from "react-query";
import { getAnimesByGenre } from "@/lib/api/animes";
import { FlashList } from "@shopify/flash-list";
import { AppLoader } from "@/components/atoms/AppLoader";
import { substring } from "@/lib/string";

const {width} = Dimensions.get("window")
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

  return (
    <View className="flex-1">
      <FlatList<Anime>
        data={data?.pages.flatMap((page) => page.results)}
        renderItem={(props)=><Item {...props} />}
        refreshing={isRefetching}
        numColumns={Math.round(width/180)}
        ItemSeparatorComponent={()=><View className="h-1" />}
        contentContainerStyle={{
          alignItems: "center"
        }}
        onRefresh={async () => await refetch()}
        ListFooterComponent={<AppLoader />}
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
const Item = React.memo(({ item }: { item: Anime }) => (
  <View>
    <Image
      source={{ uri: item.image }}
      style={{
        width: 175,
        height: 247,
      }}
    />
    {/* 
    150=>212
    175=>x
    */}
    <Text>{substring(item.title, 25)}</Text>
  </View>
));
