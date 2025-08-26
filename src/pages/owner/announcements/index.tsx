"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Eye,
  Calendar,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Plus,
  Search,
  Grid3X3,
  List,
  Menu,
  X,
  MapPin,
  Star,
  Bell,
  CreditCard,
  User,
  HelpCircle,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/owner/sidebar"

// Données simulées des annonces
const mockListings = [
  {
    id: 1,
    title: "Villa moderne avec piscine - Sidi Bou Said",
    location: "Sidi Bou Said, Tunis",
    type: "Villa",
    status: "active",
    views: 245,
    bookings: 8,
    publishDate: "2024-01-15",
    price: 180,
    image: "/moderne-villa-tunisie-piscine.png",
  },
  {
    id: 2,
    title: "Appartement centre-ville avec vue mer",
    location: "Tunis Centre, Tunis",
    type: "Appartement",
    status: "active",
    views: 189,
    bookings: 12,
    publishDate: "2024-02-03",
    price: 95,
    image: "/modern-tunisian-villa-living-room.png",
  },
  {
    id: 3,
    title: "Maison traditionnelle La Marsa",
    location: "La Marsa, Tunis",
    type: "Maison",
    status: "pending",
    views: 67,
    bookings: 3,
    publishDate: "2024-03-10",
    price: 120,
    image: "/sidi-bou-said-villa-bedroom.png",
  },
  {
    id: 4,
    title: "Studio cosy Hammamet",
    location: "Hammamet, Nabeul",
    type: "Studio",
    status: "expired",
    views: 34,
    bookings: 1,
    publishDate: "2023-12-20",
    price: 65,
    image: "/modern-villa-kitchen.png",
  },
]

export default function MesAnnonces() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")



  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expirée</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    const matchesType = typeFilter === "all" || listing.type === typeFilter
    const matchesCity = cityFilter === "all" || listing.location.includes(cityFilter)

    return matchesSearch && matchesStatus && matchesType && matchesCity
  })

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="bg-background border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif font-bold text-foreground">Mes annonces</h1>
                <p className="text-muted-foreground">Gérez vos propriétés et annonces</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/owner/announcements/create">
                <Plus className="w-4 h-4 mr-2" />
                Créer une nouvelle annonce
              </Link>
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Rechercher par titre ou localisation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="expired">Expirée</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Ville" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      <SelectItem value="Tunis">Tunis</SelectItem>
                      <SelectItem value="Hammamet">Hammamet</SelectItem>
                      <SelectItem value="Sousse">Sousse</SelectItem>
                      <SelectItem value="Monastir">Monastir</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredListings.length} annonce{filteredListings.length !== 1 ? "s" : ""} trouvée
              {filteredListings.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Listings */}
          {filteredListings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Home className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune annonce trouvée</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {searchTerm || statusFilter !== "all" || typeFilter !== "all" || cityFilter !== "all"
                    ? "Aucune annonce ne correspond à vos critères de recherche."
                    : "Vous n'avez pas encore publié d'annonce."}
                </p>
                <Button asChild>
                  <Link href="/dashboard/creer-annonce">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer votre première annonce
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-48">
                        <Image
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">{getStatusBadge(listing.status)}</div>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-2">{listing.title}</h3>
                            <p className="text-muted-foreground text-sm flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {listing.location}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{listing.type}</span>
                            <span className="font-bold text-primary">{listing.price} DT/nuit</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {listing.views} vues
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {listing.bookings} réservations
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <span className="text-xs text-muted-foreground">
                              Publié le {new Date(listing.publishDate).toLocaleDateString("fr-FR")}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Edit className="w-3 h-3 mr-1" />
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/logement/${listing.id}`}>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              <p className="text-muted-foreground text-sm flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {listing.location}
                              </p>
                            </div>
                            {getStatusBadge(listing.status)}
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>{listing.type}</span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {listing.views} vues
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {listing.bookings} réservations
                            </span>
                            <span className="font-bold text-primary">{listing.price} DT/nuit</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Publié le {new Date(listing.publishDate).toLocaleDateString("fr-FR")}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3 mr-1" />
                                Modifier
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/logement/${listing.id}`}>
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredListings.length > 0 && (
            <div className="flex items-center justify-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
