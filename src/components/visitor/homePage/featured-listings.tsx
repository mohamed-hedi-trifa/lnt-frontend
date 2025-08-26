
import React from "react"
import { Star, MapPin, Image } from "lucide-react"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"

const featuredListings = [
  {
    id: 1,
    title: "Villa moderne avec piscine - Sidi Bou Said",
    location: "Route Manzel chaker klm 2 citée sourour, Sfax",
    price: 180,
    rating: 4.9,
    reviews: 24,
    image: "/modern-villa-tunisia-pool.png",
    amenities: ["Piscine", "WiFi", "Parking"],
    type: "Villa",
  },
  {
    id: 2,
    title: "Appartement vue mer - Hammamet",
    location: "Hammamet, Nabeul",
    price: 95,
    rating: 4.7,
    reviews: 18,
    image: "/hammamet-sea-view-apartment.png",
    amenities: ["Vue mer", "WiFi", "Climatisation"],
    type: "Appartement",
  },
  {
    id: 3,
    title: "Maison traditionnelle - Médina de Tunis",
    location: "Médina, Tunis",
    price: 120,
    rating: 4.8,
    reviews: 31,
    image: "/traditional-house-medina-tunis.png",
    amenities: ["Authentique", "WiFi", "Terrasse"],
    type: "Maison",
  },
  {
    id: 4,
    title: "Studio cosy - Centre-ville Sousse",
    location: "Sousse Centre",
    price: 65,
    rating: 4.6,
    reviews: 12,
    image: "/moderne-studio-sousse.png",
    amenities: ["Centre-ville", "WiFi", "Cuisine"],
    type: "Studio",
  },
  {
    id: 5,
    title: "Villa avec jardin - Djerba",
    location: "Djerba, Médenine",
    price: 150,
    rating: 4.9,
    reviews: 27,
    image: "/placeholder.png",
    amenities: ["Jardin", "WiFi", "Barbecue"],
    type: "Villa",
  },
  {
    id: 6,
    title: "Appartement moderne - La Marsa",
    location: "La Marsa, Tunis",
    price: 110,
    rating: 4.7,
    reviews: 19,
    image: "/appartement-moderne-la-marsa.png",
    amenities: ["Moderne", "WiFi", "Balcon"],
    type: "Appartement",
  },
  {
    id: 7,
    title: "Villa avec jardin - Djerba",
    location: "Djerba, Médenine",
    price: 150,
    rating: 4.9,
    reviews: 27,
    image: "/placeholder.png",
    amenities: ["Jardin", "WiFi", "Barbecue"],
    type: "Villa",
  },
  {
    id: 8,
    title: "Appartement moderne - La Marsa",
    location: "La Marsa, Tunis",
    price: 110,
    rating: 4.7,
    reviews: 19,
    image: "/appartement-moderne-la-marsa.png",
    amenities: ["Moderne", "WiFi", "Balcon"],
    type: "Appartement",
  },
]

export default function FeaturedListings() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Logements populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les logements les mieux notés par nos voyageurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-[#FFF8EA]">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={"images/" + listing.image || "images/" +  "/placeholder.svg"}
                  alt={listing.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground  text-white">{listing.type}</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground line-clamp-2 flex-1">{listing.title}</h3>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>

                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{listing.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({listing.reviews} avis)</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4 ">
                  {listing.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity}  className="text-xs text-white">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">{listing.price} TND</span>
                    <span className="text-sm text-muted-foreground ml-1">/ nuit</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            Voir plus de logements
          </Button>
        </div>
      </div>
    </section>
  )
}
