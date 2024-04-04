import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  // StateStorage,
  createJSONStorage,
  persist,
} from "zustand/middleware";
// import { MMKV } from "react-native-mmkv";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AnimeRecentStore = {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  totalEpisodes: any;
  episodeId?: string;
  date?: string;
};
type State = {
  items: Record<string, AnimeRecentStore>;
};

// const storage = new MMKV();
// const zustandStorage: StateStorage = {
//   setItem: (name, value) => {
//     return storage.set(name, value);
//   },
//   getItem: (name) => {
//     const value = storage.getString(name);
//     return value ?? null;
//   },
//   removeItem: (name) => {
//     return storage.delete(name);
//   },
// };

type Actions = {
  addToRecents: (item: AnimeRecentStore) => void;
};

export const useRecentsViewsStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      items: {},
      addToRecents: (item) => {
        set((state) => {
          const date = new Date().toISOString();
          state.items[item.animeId] = {
            ...item,
            date,
          };
        });
      },
    })),
    {
      name: "recents",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
