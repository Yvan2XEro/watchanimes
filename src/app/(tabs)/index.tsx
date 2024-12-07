import { AnimesSection } from "@/components/organisms/AnimeSection";
import { AnimesSection2 } from "@/components/organisms/AnimeSection2";
import { GenreList } from "@/components/organisms/GenreList";
import { getAnimesByGenre, getMovies, getPopular } from "@/lib/api/animes";
import { getRecentRelease2, getTopAiring2 } from "@/lib/api/animes2";
import { AntDesign } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
    <View className="flex flex-1">
      <GenreList />
      <ScrollView>
        <AnimesSection2
          title="Recent release"
          fetchData={() =>
            getRecentRelease2({
              page: 1,
            })
          }
        />
        <AnimesSection
          title="Popular"
          fetchData={() =>
            getPopular({
              page: 1,
            })
          }
        />
        <AnimesSection2
          title="Top hairing"
          fetchData={() =>
            getTopAiring2({
              page: 1,
            })
          }
        />

        <AnimesSection
          genre="sport"
          title="Sport"
          fetchData={() =>
            getAnimesByGenre({
              genre: "sport",
              page: 1,
            })
          }
        />
        <AnimesSection
          genre="action"
          title="Action"
          fetchData={() =>
            getAnimesByGenre({
              genre: "action",
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
