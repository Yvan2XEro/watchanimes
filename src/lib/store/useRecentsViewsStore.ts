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
  items: AnimeRecentStore[];
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
      items: [],
      addToRecents: (item) => {
        set((state) => {
          const oldItem = state.items.find((i) => i.animeId === item.animeId);
          const date = new Date().toLocaleString();
          if (!oldItem) {
            state.items.push({
              ...item,
              date,
            })
            return;
          }
          const otherItems = state.items.filter(
            (i) => i.animeId != item.animeId
          );
          state.items = [...otherItems, { ...item, date }];
        });
      },
    })),
    {
      name: "recents",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
