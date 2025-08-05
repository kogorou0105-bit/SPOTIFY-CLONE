import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

type ChatStore = {
  users: User[];
  getUsers: () => Promise<void>;
  isLoading: boolean;
  error: any;
};

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  getUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate an API call to fetch users
      const response = await axiosInstance.get("/user");
      const data = response.data;
      set({ users: data, error: null });
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
