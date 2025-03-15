import Species from "@/components/visitor/aire-marine/monitoring/marin/species/Species";
import { AMCPSidebarProvider } from "@/contexts/AMCPSidebarContext";
import React from "react";

export default function PsidoniePage({ location, params }: { location: any; params: any }) {
  return (
    <AMCPSidebarProvider>
      <Species location={location} params={params} />
    </AMCPSidebarProvider>
  );
}
