"use client"

import Footer from "@/components/visitor/footer"
import Header from "@/components/visitor/header"
import PropertyGrid from "@/components/visitor/search/property-grid"
import SearchFilters from "@/components/visitor/search/search-filters"
import SortOptions from "@/components/visitor/search/sort-options"
import { useState } from "react"
import React from "react"


export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("price")
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    priceRange: [0, 1000],
    availability: "",
  })

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">Rechercher un logement</h1>
          <p className="text-muted-foreground">Trouvez le logement parfait pour votre séjour en Tunisie</p>
        </div>

        <SearchFilters filters={filters} onFiltersChange={setFilters} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">142 logements</span> trouvés
          </div>
          <SortOptions sortBy={sortBy} onSortChange={setSortBy} viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        <PropertyGrid viewMode={viewMode} />
      </main>
      <Footer />
    </div>
  )
}
