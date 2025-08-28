import IUser from "@/models/IUser";
import React, { useState, useEffect, useContext, ReactNode } from "react";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean; // Add loading state
}

const defaultState: AuthContextType = {
  user: null,
  setUser: () => { },
  isLoading: true // Initial loading state
};

const AuthContext = React.createContext<AuthContextType>(defaultState);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });


  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Load user from localStorage on component mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser: IUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      loadUserFromStorage();
    }
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [user]);

  // Create a wrapped setUser function that also updates localStorage
  const setUserWithPersistence = (newUser: IUser | null) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser: setUserWithPersistence,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}