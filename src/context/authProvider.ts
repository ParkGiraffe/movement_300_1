// src/context/authProvider.ts

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  ReactNode,
} from "react";
import { getAuth, User } from "firebase/auth";
import nookies from "nookies";

// Define the type for the AuthContext
interface AuthContextType {
  user: User | null;
}

// Create AuthContext with proper type
const AuthContext = createContext<AuthContextType>({ user: null });

// Define the type for AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (!user) {
        // ID token 없음
        setUserState(null);
        nookies.set(undefined, "token", "", { path: "/" });
        return;
      }

      // Set token cookie
      setUserState(user);
      const token = await user.getIdToken();
      nookies.destroy(undefined, "token");
      nookies.set(undefined, "token", token, { path: "/" });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const refreshToken = setInterval(async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshToken);
  }, []);

  const contextValue = useMemo(
    () => ({
      user: userState,
    }),
    [userState]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
