import { Anime2 } from "@/lib/types/entities2";
import { EpisodeItem } from "./EpisodeListItem";

type TProps = {  id: string; anime: Anime2 };
export default function SelectEpisode({ id, anime }: TProps) {
  return (
    <>
      {anime.episodesList.map((e) => (
        <EpisodeItem
          isPlaying={id === e.episodeId}
          key={e.episodeId}
          episode={e}
          anime={anime}
        />
      ))}
    </>
  );
}
