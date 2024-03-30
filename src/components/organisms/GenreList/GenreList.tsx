import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "react-query";
import { getGenres } from "@/lib/api/genres";
import { AppLoader } from "@/components/atoms/AppLoader";
import { router } from "expo-router";
import { SLASH_REPLACE } from "@/lib/constants";

export default function GenreList() {
  const genreQuery = useQuery({
    queryKey: ["genres"],
    queryFn: async () => await getGenres(),
  });
  if (genreQuery.isLoading) return <AppLoader />;
  return (
   <View className="px-3 mb-2">
     <FlashList
      data={genreQuery.data || []}
      horizontal
      style={{paddingHorizontal: 10}}
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={84}
      ItemSeparatorComponent={()=><View className="w-1" />}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={()=>router.push(`animes/${item.id+SLASH_REPLACE+item.title}`)} className="p-1 px-3 rounded-lg text-[30px] bg-violet-600">
            <Text className="text-white">{item.title}</Text>
          </TouchableOpacity>
        );
      }}
    />
   </View>
  );
}
