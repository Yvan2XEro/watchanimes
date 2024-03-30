import { API_URL } from "../constants";
import { NewRelease, NewReleaseInfo } from "../types/entities";

export async function getNews() {
  try {
    const response = await fetch(`${API_URL}/news/ann/recent-feeds`);
    const data = await response.json();
    if (response.ok) {
      return data as NewRelease[];
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}


export async function getNewInfo(id:string) {
  try {
    const response = await fetch(`${API_URL}/news/ann/info?id=${id}`);
    const data = await response.json();
    if (response.ok) {
      return data as NewReleaseInfo
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}