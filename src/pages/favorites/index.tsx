"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, ArrowLeft, Grid3X3, List } from "lucide-react"
import Link from "next/link"
import Header from "@/components/visitor/header"

// Données simulées des favoris
const favoriteListings = [
    {
        id: 1,
        title: "Villa moderne avec piscine",
        city: "Sidi Bou Saïd",
        price: 120,
        image: "/images/modern-villa-tunisia-pool.png",
        dateAdded: "2024-01-15",
    },
    {
        id: 2,
        title: "Appartement vue mer",
        city: "La Marsa",
        price: 85,
        image: "/images/modern-villa-tunisia-pool.png",
        dateAdded: "2024-01-10",
    },
    {
        id: 3,
        title: "Maison traditionnelle",
        city: "Tunis",
        price: 65,
        image: "/images/modern-villa-tunisia-pool.png",
        dateAdded: "2024-01-08",
    },
]

export default function FavorisPage() {
    const [favorites, setFavorites] = useState(favoriteListings)
    const [sortBy, setSortBy] = useState("dateAdded")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    const handleRemoveFromFavorites = (id: number) => {
        setFavorites(favorites.filter((item) => item.id !== id))
    }

    const sortedFavorites = [...favorites].sort((a, b) => {
        switch (sortBy) {
            case "price":
                return a.price - b.price
            case "city":
                return a.city.localeCompare(b.city)
            case "dateAdded":
            default:
                return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        }
    })

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/recherche">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Retour à la recherche
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Mes favoris</h1>
                            <p className="text-muted-foreground">
                                {favorites.length} logement{favorites.length > 1 ? "s" : ""} enregistré{favorites.length > 1 ? "s" : ""}
                            </p>
                        </div>

                        {favorites.length > 0 && (
                            <div className="flex items-center gap-3">
                                {/* View Mode Toggle */}
                                <div className="flex border border-border rounded-lg p-1">
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="px-3"
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                        className="px-3"
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Sort Options */}
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Trier par" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dateAdded">Date d'ajout</SelectItem>
                                        <SelectItem value="price">Prix</SelectItem>
                                        <SelectItem value="city">Ville</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {favorites.length === 0 ? (
                    // Empty State
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                            <Heart className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">Aucun favori enregistré</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Vous n'avez encore enregistré aucun logement. Explorez nos annonces et ajoutez vos coups de cœur !
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/">
                                <Button variant="outline">Retour à l'accueil</Button>
                            </Link>
                            <Link href="/recherche">
                                <Button>Découvrir les logements</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Favorites Grid/List
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                        {sortedFavorites.map((listing) => (
                            <Card
                                key={listing.id}
                                className={`group hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex flex-row" : ""
                                    }`}
                            >
                                <div className={viewMode === "list" ? "w-48 flex-shrink-0" : "relative"}>
                                    <div
                                        className={`relative overflow-hidden ${viewMode === "list" ? "h-full rounded-l-lg" : "h-48 rounded-t-lg"
                                            }`}
                                    >
                                        <img
                                            src={listing.image || "/placeholder.svg"}
                                            alt={listing.title}
                                            
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 p-2"
                                            onClick={() => handleRemoveFromFavorites(listing.id)}
                                        >
                                            <Heart className="w-4 h-4 fill-current" />
                                        </Button>
                                    </div>
                                </div>

                                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                                    <div className="space-y-2">
                                        <h3 className="font-serif font-semibold text-lg text-foreground line-clamp-2">{listing.title}</h3>
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {listing.city}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-primary">
                                                {listing.price}€<span className="text-sm font-normal text-muted-foreground">/nuit</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`flex gap-2 ${viewMode === "list" ? "mt-4" : "mt-4"}`}>
                                        <Link href={`/logement/${listing.id}`} className="flex-1">
                                            <Button className="w-full">Voir les détails</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
