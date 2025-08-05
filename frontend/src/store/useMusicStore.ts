import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import type { Album, Song } from "@/types";
type MusicStore = {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: any;
  currentAlbum: null | Album;
  fetchAlbums: () => Promise<void>;
  fetchAlbum: (id: string) => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: true,
  error: null,
  currentAlbum: null,
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      const data = response.data;
      set({ albums: data, error: null });
    } catch (error: any) {
      console.error("Error fetching albums:", error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbum: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      const data = response.data;
      set({ currentAlbum: data, error: null });
    } catch (error: any) {
      console.error("Error fetching album:", error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
