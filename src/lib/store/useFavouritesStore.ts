import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  StateStorage,
  createJSONStorage,
  persist,
} from "zustand/middleware";
// import { MMKV } from "react-native-mmkv";
import AsyncStorage from '@react-native-async-storage/async-storage'


export type AnimeStore = {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  totalEpisodes: any;
};
type State = {
  items: Record<string, AnimeStore>;
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
  toggleFavourite: (item: AnimeStore) => void;
  isFaourite: (id: string) => boolean;
};

export const useFavouritesStore = create<State & Actions>()(
  persist(
    immer((set, state) => ({
      items: {},
      toggleFavourite: (item) => {
        set((state) => {
          if (!!state.items[item.animeId]) {
            delete state.items[item.animeId];
            return;
          }
          state.items[item.animeId] = item;
        });
      },
      isFaourite(id) {
        return state().items[id] ? true : false;
      },
    })),
    {
      name: "favourites",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
