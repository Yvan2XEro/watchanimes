type Preview = {
  intro: string;
  full: string;
};

export type AnimesServer =
  | "gogoanime"
  | "enime"
  | "crunchyroll"
  | "bilibili"
  | "animepahe"
  | "animefox"
  | "9anime"
  | "zoro";

export type NewRelease = {
  id: string;
  title: string;
  uploadedAt: string;
  topics: string[];
  preview: Preview;
  thumbnail: string;
  url: string;
};

export type NewReleaseInfo = {
  id: string;
  title: string;
  uploadedAt: string;
  intro: string;
  description: string;
  thumbnail: string;
  url: string;
};

export type TopAiring = {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[];
};

export type RecentEpisode = {
  id: string;
  episodeId: string;
  episodeNumber: 0;
  title: string;
  image: string;
  url: string;
};

export type Paginated<T> = {
  currentPage: number;
  hasNextPage: boolean;
  results: T[];
};

export type Anime = {
  id: string;
  title: string;
  releaseDate: string;
  image: string;
  url: string;
};

export type Episode = {
  id: string;
  number: 0;
  url: string;
};

export type AnimeInfo = {
  animeTitle: string;
  type: string;
  releasedDate: string;
  status: string;
  genres: string[];
  otherNames: string;
  synopsis: string;
  animeImg: string;
  episodesAvaliable: string;
  episodesList: [
    {
      episodeId: string;
      episodeNum: string;
      episodeUrl: string;
    }
  ];
};
