import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "../api/axios";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("vntu_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      // Важливо: відразу ставимо заголовок для axios
      api.defaults.headers.common["Authorization"] =
        `Bearer ${parsed.token || parsed.access_token}`;
    }
    setIsAuthLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password });

    // ЛОГ: Подивись, що САМЕ приходить (access_token чи token)
    console.log("Login response data:", res.data);

    const token = res.data.access_token || res.data.token; // Беремо будь-який варіант

    const userData = {
      name: username,
      token: token,
    };

    setUser(userData);
    localStorage.setItem("vntu_user", JSON.stringify(userData));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("vntu_user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoginOpen,
        setIsLoginOpen,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
