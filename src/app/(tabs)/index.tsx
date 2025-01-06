import { AnimesSection } from "@/components/organisms/AnimeSection";
import { AnimesSection2 } from "@/components/organisms/AnimeSection2";
import { GenreList } from "@/components/organisms/GenreList";
import { getAnimesByGenre, getMovies, getPopular } from "@/lib/api/animes";
import { getRecentRelease2, getTopAiring2 } from "@/lib/api/animes2";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Page() {
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
