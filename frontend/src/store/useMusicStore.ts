import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import type { Album, Song } from "@/types";
type MusicStore = {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: any;
  currentAlbum: null | Album;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  fetchAlbums: () => Promise<void>;
  fetchAlbum: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: true,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
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
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
