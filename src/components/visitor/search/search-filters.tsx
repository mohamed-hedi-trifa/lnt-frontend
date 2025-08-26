"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

import { MapPin, Home, Calendar, Euro, Filter, X } from "lucide-react"
import { Slider } from "@radix-ui/react-slider"

interface SearchFiltersProps {
  filters: {
    city: string
    propertyType: string
    budget: string
   
  }
  onFiltersChange: (filters: any) => void
}

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      city: "",
      propertyType: "",
      budget: "",
    })
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </div>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              {Object.values(filters).filter((v) => v && (Array.isArray(v) ? v[0] > 0 || v[1] < 1000 : true)).length}
            </span>
          </Button>
        </div>

        {/* Filters */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${!isExpanded ? "hidden md:grid" : ""}`}>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Ville
            </label>
            <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tunis">Tunis</SelectItem>
                <SelectItem value="sousse">Sousse</SelectItem>
                <SelectItem value="sfax">Sfax</SelectItem>
                <SelectItem value="hammamet">Hammamet</SelectItem>
                <SelectItem value="monastir">Monastir</SelectItem>
                <SelectItem value="djerba">Djerba</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" />
              Type de logement
            </label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de logement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appartement">Appartement</SelectItem>
                <SelectItem value="maison">Maison</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="chambre">Chambre</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Disponibilité
            </label>
            <Select value={filters.budget} onValueChange={(value) => updateFilter("Budget", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50">0 - 50 TND</SelectItem>
                <SelectItem value="50-100">50 - 100 TND</SelectItem>
                <SelectItem value="100-200">100 - 200 TND</SelectItem>
                <SelectItem value="200+">200+ TND</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Euro className="w-4 h-4 text-primary" />
              Prix par nuit
            </label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter("priceRange", value)}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{filters.priceRange[0]}€</span>
                <span>{filters.priceRange[1]}€</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Clear Filters */}
        {(isExpanded || window.innerWidth >= 768) && (
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="w-4 h-4 mr-1" />
              Effacer les filtres
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
