import { AnimesSection } from "@/components/organisms/AnimeSection";
import { GenreList } from "@/components/organisms/GenreList";
import { NewReleasesSwiper } from "@/components/organisms/NewReleasesSwiper";
import { RecentViewSwiper } from "@/components/organisms/RecentViewSwiper";
import { TopAiringSwiper } from "@/components/organisms/TopAiringSwiper";
import { getAnimesByGenre, getMovies, getPopular } from "@/lib/api/animes";
import { AntDesign } from "@expo/vector-icons";
import { Link, router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

export default function Page() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <View>
      //     <Image
      //       source={require("../assets/logo.png")}
      //       style={{ width: 50, height: 50, borderRadius: 100 }}
      //     />
      //   </View>
      // ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 8 }}
          onPress={() => router.push("search")}
        >
          <Animated.View sharedTransitionTag="search">
            <AntDesign name="search1" size={24} color="black" />
          </Animated.View>
        </TouchableOpacity>
      ),
      headerTitle: "Hi Otaku!",
    });
  }, []);
  return (
    <View className="flex flex-1 bg-white">
      <GenreList />
      <ScrollView>
        <AnimesSection
          genre="popular"
          title="Popular"
          right={
            <Link className="text-violet-600" href={`/animes/ghj`}>
              More
            </Link>
          }
          fetchData={() =>
            getPopular({
              page: 1,
            })
          }
        />
        <AnimesSection
          genre="drama"
          title="Drama"
          fetchData={() =>
            getAnimesByGenre({
              genre: "drama",
              page: 1,
            })
          }
        />

        <AnimesSection
          genre="movies"
          title="Movies"
          fetchData={() =>
            getMovies({
              page: 1,
            })
          }
        />
      </ScrollView>
    </View>
  );
}
