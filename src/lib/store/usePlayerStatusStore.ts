import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PlayingAnime } from "../types/entities2";

type State = {
  status: "minimised" | "maximised";
  currentPlaying: PlayingAnime | null;
};

type Actions = {
  setAnime: (a: PlayingAnime) => void;
  setStatus: (s: "minimised" | "maximised") => void;
  playAnime: (a: PlayingAnime) => void;
};

const usePlayerStatusStore = create<State & Actions>()(
  immer((set) => ({
    status: "minimised",
    currentPlaying: null,
    setAnime: (a) => {
      set((state) => {
        state.currentPlaying = a;
      });
    },
    setStatus: (s) => {
      set((state) => {
        state.status = s;
      });
    },
    playAnime: (a) => {
      set((state) => {
        state.currentPlaying = a;
        state.status = "maximised";
      });
    },
  }))
);

export default usePlayerStatusStore;
