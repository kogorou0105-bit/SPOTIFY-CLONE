import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
        }
      } catch (error: unknown) {
        updateApiToken(null);
        console.log("Error in auth provider:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [getToken, setIsLoading, checkAdminStatus]);
  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader className="size-8 text-emerald-500 animate-spin" />
    </div>
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
