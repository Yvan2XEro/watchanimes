import { Item, ItemSkeleton } from "@/components/organisms/AnimeSection";
import { searchAnimes } from "@/lib/api/animes";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { Anime } from "@/lib/types/entities";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useInfiniteQuery } from "react-query";

const { width } = Dimensions.get("window");

export default function search() {
  const navigation = useNavigation();
  const [q, setQ] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppSearchbar
          value={q}
          onChange={setQ}
          onGoback={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  const animesQuery = useInfiniteQuery({
    queryKey: ["animes", q],
    enabled: q.length > 2,
    queryFn: async ({ pageParam = 1 }) =>
      searchAnimes({
        page: pageParam,
        q,
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
        renderItem={(props) => <Item {...props} />}
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
    <View className="bg-card flex-1 px-3">
      <RenderContent />
    </View>
  );
}

type TProps = {
  onGoback: () => void;
  value: string;
  onChange: (t: string) => void;
};
function AppSearchbar({ onGoback, onChange }: TProps) {
  const { text } = useThemeColor()
  return (
    <View className="mt-[24] flex-row items-center p-1">
      <TouchableOpacity
        className="bg-card flex-row items-center justify-center h-[40] w-[40] rounded-[50]"
        onPress={onGoback}
      >
        <Ionicons name="chevron-back" size={24} color={text} />
      </TouchableOpacity>
      <TextInput
        onChangeText={onChange}
        placeholder="Search..."
        className="flex-auto"
        autoFocus
      />
      <Animated.View sharedTransitionTag="search">
        <AntDesign name="search1" size={24} color="black" />
      </Animated.View>
    </View>
  );
}
