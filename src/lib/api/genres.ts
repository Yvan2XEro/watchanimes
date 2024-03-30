import { API_URL } from "../constants";
import { AnimesServer } from "../types/entities";

export async function getGenres(server: AnimesServer = "gogoanime") {
  try {
    const response = await fetch(`${API_URL}/anime/${server}/genre/list`);
    const data = await response.json();
    if (response.ok) {
      return data as { id: string; title: string }[];
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
