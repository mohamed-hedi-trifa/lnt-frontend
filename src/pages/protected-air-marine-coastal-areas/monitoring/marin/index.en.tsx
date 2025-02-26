import SuiviScientifique3 from "@/components/visitor/aire-marine/monitoring/marin/SuivieScientifique3";
import { AMCPSidebarProvider } from "@/contexts/AMCPSidebarContext";
import React from "react";

export default function MarinPage() {
  return (
    <AMCPSidebarProvider>
      <SuiviScientifique3 />
    </AMCPSidebarProvider>
  );
}
