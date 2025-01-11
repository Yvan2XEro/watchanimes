import { getEpisodeStreamingLink } from "@/lib/api/animes2";
import usePlayerStatusStore from "@/lib/store/usePlayerStatusStore";
import { useRecentsViewsStore } from "@/lib/store/useRecentsViewsStore";
import { useVideoPlayer, VideoPlayer } from "expo-video";
import { createContext, PropsWithChildren, useContext } from "react";
import { useQuery } from "react-query";

interface IProps {
  player: VideoPlayer | null;
}
const VideoCtx = createContext<IProps>({ player: null });

export function VideoProvider({ children }: PropsWithChildren) {
  const { currentPlaying } = usePlayerStatusStore();
  const episodeQuery = useQuery({
    queryKey: ["episode", currentPlaying?.episodeId],
    enabled: !!currentPlaying,
    queryFn: () => getEpisodeStreamingLink({ id: currentPlaying?.episodeId }),
  });
  const animeId = currentPlaying?.episodeId.split("-episode-")[0];
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
  return <VideoCtx.Provider value={{ player }}>{children}</VideoCtx.Provider>;
}

export function useVideoProvider() {
  const ctx = useContext(VideoCtx);
  if (!ctx)
    throw new Error(
      '"useVideoProvider" must be used inside a  "VideoProvider"'
    );
  return ctx;
}
