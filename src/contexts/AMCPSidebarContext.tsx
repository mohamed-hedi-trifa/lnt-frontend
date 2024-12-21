// src/context/SidebarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  opened: boolean;
  setOpened: (state: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const AMCPSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);

  return (
    <SidebarContext.Provider value={{ opened, setOpened }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for easier access
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};
