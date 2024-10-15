import React, { useState, useEffect, useContext, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const defaultState: AuthContextType = {
  user: null,
  setUser: () => { }
};

const AuthContext = React.createContext<AuthContextType>(defaultState);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
