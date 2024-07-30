import { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  auth: {
    user: string | null;
    token: string | null;
  };
  setAuth: (auth: { user: string | null; token: string | null }) => void;
};

const AuthContext = createContext<AuthContextType>({
  auth: { user: null, token: null },
  setAuth: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ user: string | null; token: string | null }>({
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuth({ user, token });
    }
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
