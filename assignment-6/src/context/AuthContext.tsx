import { authApi } from "../services/auth_api";
import { useRouter } from "next/router";
import {
  useCallback,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

interface AuthContextValues {
  isLogin: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValues | null>(null);

function useAuthContext() {
  const context = useContext(AuthContext);
  return context!;
}

const tokenKey = "df-token";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState(() => {
    return typeof window === "undefined"
      ? false
      : Boolean(window.localStorage.getItem(tokenKey));
  });

  const { pathname, replace } = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      if (response.data.accessToken) {
        window.localStorage.setItem(tokenKey, response.data.accessToken);
        // authApi.setAuthHeader(response.data.accessToken);
        setIsLogin(true);
      } else {
        // handle error
        console.error("Error");
      }
    } catch (error) {
      // handle error
      console.error(error);
    }
  }, []);

  const logout = useCallback(() => {
    setIsLogin(false);
    window.localStorage.removeItem(tokenKey);
  }, []);

  useEffect(() => {
    if (!isLogin && pathname !== "/login") {
      replace("/login");
    }
  }, [isLogin, pathname, replace]);

  console.log(pathname);

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
