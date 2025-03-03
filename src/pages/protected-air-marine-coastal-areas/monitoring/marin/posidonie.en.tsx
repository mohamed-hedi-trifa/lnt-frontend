import Psidonie from "@/components/visitor/aire-marine/monitoring/marin/psidonie/Psidonie";
import { AMCPSidebarProvider } from "@/contexts/AMCPSidebarContext";
import React from "react";

export default function PsidoniePage() {
  return (
    <AMCPSidebarProvider>
      <Psidonie />
    </AMCPSidebarProvider>
  );
}
