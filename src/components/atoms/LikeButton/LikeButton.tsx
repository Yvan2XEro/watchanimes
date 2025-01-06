import { useThemeColor } from '@/lib/hooks/useThemeColor';
import { AnimeStore, useFavouritesStore } from '@/lib/store/useFavouritesStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

export default  function LikeButton({animeId,animeImg,animeTitle}:AnimeStore) {
    const { isFaourite, toggleFavourite } = useFavouritesStore();
    const { text } = useThemeColor()
    return (
      <Pressable
        className="absolute top-1 right-1 overflow-hidden items-center justify-center bg-card w-[30] h-[30] z-[50]"
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
          color={text}
        />
      </Pressable>
    );
  }