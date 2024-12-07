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

export type PlayingAnime = {
  animeId: string;
  episodeId: string;
  episodeNum: string;
  episodeUrl: string;
  animeImg: string;
  animeTitle: string;
  type: string;
};

export type Episode2 = {
  episodeId: string;
  episodeNum: string;
  episodeUrl: string;
};

export type EpisodeLink2 = {
  Referer: string;
  sources: {
    file: string;
    label: string;
    type: string;
  }[];
  sources_bk: {
    file: string;
    label: string;
    type: string;
  }[];
};
