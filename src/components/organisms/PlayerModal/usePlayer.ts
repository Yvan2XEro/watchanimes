import { useRecentsViewsStore } from '@/lib/store/useRecentsViewsStore';
import { useVideoPlayer } from 'expo-video';
import React from 'react'

export default function usePlayer() {
    const { addToRecents } = useRecentsViewsStore();
    const player = useVideoPlayer(
      episodeQuery.data?.sources?.[0].file,
      (player) => {
        player.loop = true;
        player.play();
        if (currentPlaying)
          addToRecents({
            animeId,
            animeImg: currentPlaying.animeImg,
            animeTitle: currentPlaying.animeTitle,
            episodeId: currentPlaying?.episodeId,
            totalEpisodes: null,
          });
      }
    );
}
