import { API_URL } from "../constants";
import { AnimesServer, Paginated, RecentEpisode } from "../types/entities";

type TProps = {
  server?: AnimesServer;
  type?: number;
  page?: number;
};
export async function getRecentsEpisodes({
  server = "gogoanime",
  type = 1,
  page = 1,
}: TProps) {
  try {
    const response = await fetch(`${API_URL}/${server}/recent-episodes`);
    const data = await response.json();
    if (response.ok) {
      return data as Paginated<RecentEpisode>
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
