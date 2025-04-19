import { create } from "zustand";
import { jobType } from "@/types/jobTypes";

interface FavoritesState {
  favorites: jobType[];
  addFavorite: (job: jobType) => void;
  removeFavorite: (jobId: string) => void;
  isFavorited: (jobId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (job) => {
    if (!get().isFavorited(job.id.toString())) {
      set((state) => ({ favorites: [...state.favorites, job] }));
    }
  },
  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((job) => job.id !== jobId),
    }));
  },
  isFavorited: (jobId) => {
    return get().favorites.some((job) => job.id === jobId);
  },
}));
