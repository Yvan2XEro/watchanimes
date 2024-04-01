export type Anime2 = {
  animeId: string;
  animeTitle: string;
  type: string;
  releasedDate: string;
  status: string;
  genres: string[];
  otherNames?: string | undefined;
  synopsis: string;
  animeImg: string;
  totalEpisodes: string;
  episodesList: Episode2[];
};

export type Episode2 = {
  episodeId: string;
  episodeNum: string;
  episodeUrl: string;
};
