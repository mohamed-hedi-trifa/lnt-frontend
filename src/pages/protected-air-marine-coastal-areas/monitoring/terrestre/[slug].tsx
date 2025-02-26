import Blog from "@/components/visitor/aire-marine/monitoring/marin/blog/Blog";
import { AMCPSidebarProvider } from "@/contexts/AMCPSidebarContext";
import React from "react";

export default function PsidoniePage({ location, params }: { location: any; params: any }) {
  return (
    <AMCPSidebarProvider>
      <Blog location={location} params={params} />
    </AMCPSidebarProvider>
  );
}
