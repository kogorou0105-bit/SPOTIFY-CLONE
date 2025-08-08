import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types";
import { create } from "zustand";
import { io } from "socket.io-client";
type ChatStore = {
  users: User[]; //右侧显示用户列表
  isLoading: boolean; //
  error: any;
  socket: any; // Socket.IO client instance
  isConnected: boolean; // 是否连接到Socket.IO服务器
  onlineUsers: Set<string>; // 在线用户的Set集合
  userActivities: Map<string, string>; // 用户听歌情况的Map集合，键为用户ID，值为活动状态
  messages: Message[]; // 消息列表，包含所有与选中用户的消息
  selectedUser: User | null; // 当前选中的用户，null表示没有选中用户
  getUsers: () => Promise<void>; // 获取用户列表的异步函数

  initSocket: (userId: string) => void; // 初始化Socket.IO连接的函数，传入用户ID
  disconnectSocket: () => void; // 断开Socket.IO连接的函数
  sendMessage: (receiverId: string, senderId: string, content: string) => void; // 发送消息的函数，接收者ID、发送者ID和消息内容作为参数
  fetchMessages: (userId: string) => Promise<void>; // 获取与选中用户的消息列表的异步函数，传入用户ID
  setSelectedUser: (user: User | null) => void; // 设置当前选中用户的函数，传入用户对象或null
};

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(baseURL, {
  autoConnect: false, // only connect if user is authenticated
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
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
  initSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });
      socket.emit("user_connected", userId);

      set({ isConnected: true });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },
  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("send_message", { receiverId, senderId, content });
  },
  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
