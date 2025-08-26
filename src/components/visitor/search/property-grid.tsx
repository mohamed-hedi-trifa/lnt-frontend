"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MapPin, Star, Users, Wifi, Car, Waves } from "lucide-react"


interface PropertyGridProps {
  viewMode: "grid" | "list"
}

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Appartement moderne avec vue mer",
    city: "Sousse",
    price: 85,
    rating: 4.8,
    reviews: 24,
    image: "/images/modern-villa-tunisia-pool.png",
    amenities: ["Wifi", "Parking", "Piscine"],
    guests: 4,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Villa luxueuse avec piscine privée",
    city: "Hammamet",
    price: 150,
    rating: 4.9,
    reviews: 18,
    image: "/images/modern-villa-tunisia-pool.png",
    amenities: ["Wifi", "Piscine", "Parking"],
    guests: 8,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Studio cosy centre-ville",
    city: "Tunis",
    price: 45,
    rating: 4.6,
    reviews: 32,
    image: "/images/modern-villa-tunisia-pool.png",
    amenities: ["Wifi"],
    guests: 2,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Maison traditionnelle rénovée",
    city: "Djerba",
    price: 95,
    rating: 4.7,
    reviews: 15,
    image: "/images/modern-villa-tunisia-pool.png",
    amenities: ["Wifi", "Parking"],
    guests: 6,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Appartement face à la plage",
    city: "Monastir",
    price: 75,
    rating: 4.5,
    reviews: 28,
    image: "/images/modern-villa-tunisia-pool.png",
    amenities: ["Wifi", "Piscine"],
    guests: 4,
    isFavorite: false,
  },
  {
    id: 6,
    title: "Penthouse avec terrasse panoramique",
    city: "Sfax",
    price: 120,
    rating: 4.8,
    reviews: 12,
    image: "/images/modern-villa-tunisia-pool.png",
    amenities: ["Wifi", "Parking"],
    guests: 6,
    isFavorite: false,
  },
]

export default function PropertyGrid({ viewMode }: PropertyGridProps) {
  const [favorites, setFavorites] = useState<number[]>([2])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-3 h-3" />
      case "parking":
        return <Car className="w-3 h-3" />
      case "piscine":
        return <Waves className="w-3 h-3" />
      default:
        return null
    }
  }

  const totalPages = Math.ceil(properties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProperties = properties.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      {/* Property Grid/List */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}
      >
        {currentProperties.map((property) => (
          <Card key={property.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative ">

              <img
                src={property.image}
                alt={property.title}
                width={300}
                height={200}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${viewMode === "list" ? "h-48 md:h-32" : "h-48"
                  }`}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(property.id)}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                />
              </Button>
              <Badge className="absolute bottom-2 left-2 bg-primary text-white">
                {property.price}€/nuit
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className={`${viewMode === "list" ? "md:flex md:justify-between md:items-start" : ""}`}>
                <div className={`${viewMode === "list" ? "md:flex-1" : ""}`}>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.city}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({property.reviews} avis)</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{property.guests}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex gap-2 ${viewMode === "list" ? "md:flex-col md:ml-4" : ""}`}>
                  <Button className="flex-1 text-white" size="sm">
                    Voir plus
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="w-10 text-white"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
