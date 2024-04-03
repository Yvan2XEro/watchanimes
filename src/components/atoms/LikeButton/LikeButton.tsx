import { Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { AnimeStore, useFavouritesStore } from '@/lib/store/useFavouritesStore';

export default  function LikeButton({animeId,animeImg,animeTitle}:AnimeStore) {
    const { isFaourite, toggleFavourite } = useFavouritesStore();
    return (
      <Pressable
        className="absolute top-1 right-1 overflow-hidden items-center justify-center bg-white w-[30] h-[30] z-[50]"
        onPress={() => {
          toggleFavourite({
            animeId,
            animeImg,
            animeTitle,
            totalEpisodes: null,
          });
        }}
        style={{
          borderRadius: 20
        }}
      >
        <Ionicons
          name={isFaourite(animeId) ? "heart" : "heart-outline"}
          text="Favourite"
          size={22}
        />
      </Pressable>
    );
  }