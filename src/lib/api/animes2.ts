import { API2_URL } from "../constants";
import { Anime, AnimeInfo, AnimesServer, Paginated, TopAiring } from "../types/entities";
import { Anime2, EpisodeLink2 } from "../types/entities2";

type TProps = {
  server?: AnimesServer;
  page?: number;
};
export async function getTopAiring2({  page = 1 }: TProps) {
  try {
    const response = await fetch(
      `${API2_URL}/top-airing?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Anime2[];
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}


export async function getRecentRelease2({  page = 1 }: TProps) {
  try {
    const response = await fetch(
      `${API2_URL}/recent-release?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Anime2[];
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAnimesByGenre2({
  genre,
  page,
  
}: {
  genre: string;
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API2_URL}/genre/${genre}?page=${page}`
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

export async function getMovies2({
  page,
  
}: {
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API2_URL}/movies?page=${page}`
    );
    const data = await response.json();
    if (response.ok) {
      return data as Anime2[]
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getPopular2({
  page,
  
}: {
  page: number;
  server?: AnimesServer;
}) {
  try {
    const response = await fetch(
      `${API2_URL}/popular?page=${page}`
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


export async function getANimeInfos2({id}: { id: string}) {
  try {
    const response = await fetch(`${API2_URL}/anime-details/${id}`)
    const data = await response.json()
    if(response.ok) {
      return data as Anime2
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}


export async function getEpisodeStreamingLink({id, server="vidcdn"}: {id: string, server?: "vidcdn"}) {
  try {
    const response = await fetch(`${API2_URL}/${server}/watch/${id}`)
    const data = await response.json()
    if(response.ok) {
      return data as EpisodeLink2
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}