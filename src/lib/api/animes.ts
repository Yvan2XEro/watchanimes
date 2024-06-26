import { API2_URL, API_URL } from "../constants";
import {
  Anime,
  AnimeInfo,
  AnimesServer,
  Paginated,
  TopAiring,
} from "../types/entities";

type TProps = {
  server?: AnimesServer;
  page?: number;
};
export async function getTopAiring({ server = "gogoanime", page = 1 }: TProps) {
  try {
    const response = await fetch(
      `${API_URL}/${server}/top-airing?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Paginated<TopAiring>;
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAnimesByGenre({
  genre,
  page,
  server = "gogoanime",
}: {
  genre: string;
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API_URL}/anime/${server}/genre/${genre}?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Paginated<Anime>;
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getMovies({
  page,
  server = "gogoanime",
}: {
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API_URL}/anime/${server}/movies?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Paginated<Anime>;
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getPopular({
  page,
  server = "gogoanime",
}: {
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API_URL}/anime/${server}/popular?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Paginated<Anime>;
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getANimeInfos({ id }: { id: string }) {
  try {
    const response = await fetch(`${API2_URL}/anime-details/${id}`);
    const data = await response.json();
    if (response.ok) {
      return data as AnimeInfo;
    }
  } catch (error) {}
}

export async function searchAnimes({
  q,
  page,
  server = "gogoanime",
}: {
  q: string;
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API_URL}/anime/${server}/${q}?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Paginated<Anime>;
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
