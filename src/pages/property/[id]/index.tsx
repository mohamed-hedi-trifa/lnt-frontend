"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import {
  Heart,
  Share2,
  MapPin,
  Users,
  Wifi,
  Car,
  Tv,
  Wind,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  X,
  Facebook,
  Twitter,
  Link,
} from "lucide-react"
import Header from "@/components/visitor/header"
import { Separator } from "@radix-ui/react-select"


// Données simulées pour un logement
const propertyData = {
  id: "1",
  title: "Villa moderne avec piscine - Sidi Bou Said",
  price: 120,
  city: "Sidi Bou Said",
  address: "15 Rue des Jasmins, Sidi Bou Said 2026",
  type: "Villa",
  capacity: 6,
  bedrooms: 3,
  bathrooms: 2,
  description:
    "Magnifique villa moderne située dans le pittoresque village de Sidi Bou Said. Cette propriété offre une vue imprenable sur la mer Méditerranée et dispose d'une piscine privée. Parfaite pour des vacances en famille ou entre amis, elle combine le charme traditionnel tunisien avec le confort moderne.",
  images: [
    "/images/modern-villa-tunisia-pool.png",
    "/images/modern-villa-tunisia-pool.png",
    "/images/modern-villa-tunisia-pool.png",
    "/images/modern-villa-tunisia-pool.png",
    "/images/modern-villa-tunisia-pool.png",
  ],
  amenities: [
    { icon: Wifi, label: "WiFi gratuit" },
    { icon: Car, label: "Parking privé" },
    { icon: Tv, label: "TV écran plat" },
    { icon: Wind, label: "Climatisation" },
  ],
  rating: 4.8,
  reviewCount: 24,
  reviews: [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "Il y a 2 semaines",
      comment:
        "Villa exceptionnelle avec une vue magnifique ! L'hôte était très accueillant et la propriété était impeccable.",
    },
    {
      id: 2,
      name: "Ahmed K.",
      rating: 4,
      date: "Il y a 1 mois",
      comment:
        "Très bon séjour, la piscine était parfaite pour se détendre. Quelques petits détails à améliorer mais dans l'ensemble excellent.",
    },
    {
      id: 3,
      name: "Marie L.",
      rating: 5,
      date: "Il y a 2 mois",
      comment: "Emplacement idéal à Sidi Bou Said, proche de tout. La villa est exactement comme sur les photos.",
    },
  ],
  whatsappNumber: "+21612345678",
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length)
  }

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % propertyData.images.length)
  }

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length)
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par votre logement "${propertyData.title}" à ${propertyData.price}DT/nuit.`,
    )
    window.open(`https://wa.me/${propertyData.whatsappNumber}?text=${message}`, "_blank")
  }

  const handleShare = async () => {
    setShowShareMenu(!showShareMenu)
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
    setShowShareMenu(false)
  }

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Découvrez ce magnifique logement: ${propertyData.title}`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
    setShowShareMenu(false)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papiers!")
    } catch (err) {
      console.log("Erreur lors de la copie:", err)
    }
    setShowShareMenu(false)
  }

  const openInMaps = () => {
    const encodedAddress = encodeURIComponent(propertyData.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="relative mb-4">
            <div
              className="relative h-80 md:h-[400px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(currentImageIndex)}
            >
              <img
                src={propertyData.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${propertyData.title} - Image ${currentImageIndex + 1}`}
                
                className="object-cover hover:scale-105 transition-transform duration-300 bg-cover"
              />

              <Button
                variant="secondary"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {propertyData.images.length}
              </div>

              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                Cliquer pour agrandir
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {propertyData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                      ? "border-primary shadow-lg scale-105"
                      : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Miniature ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                    {propertyData.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{propertyData.city}</span>
                  </div>
                </div>
                <div className="flex gap-2 relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`transition-colors ${isFavorite ? "text-red-500 border-red-500 bg-red-50" : ""}`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <div className="relative">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    {showShareMenu && (
                      <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                        <button
                          onClick={shareToFacebook}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 rounded-t-lg"
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                          Partager sur Facebook
                        </button>
                        <button
                          onClick={shareToTwitter}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                          <Twitter className="w-4 h-4 text-blue-400" />
                          Partager sur Twitter
                        </button>
                        <button
                          onClick={copyLink}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 rounded-b-lg"
                        >
                          <Link className="w-4 h-4 text-gray-600" />
                          Copier le lien
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{propertyData.rating}</span>
                  <span className="text-muted-foreground">({propertyData.reviewCount} avis)</span>
                </div>
                <Badge variant="secondary">{propertyData.type}</Badge>
              </div>

              <div className="text-3xl font-bold text-primary mb-4">
                {propertyData.price} DT <span className="text-lg font-normal text-muted-foreground">/ nuit</span>
              </div>
            </div>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Localisation
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{propertyData.address}</span>
                  <Button variant="outline" size="sm" onClick={openInMaps} className="ml-4 bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir sur Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{propertyData.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Informations du logement</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">{propertyData.capacity} personnes</div>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 text-primary font-bold text-lg">🛏️</div>
                    <div className="text-sm font-medium">{propertyData.bedrooms} chambres</div>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 text-primary font-bold text-lg">🚿</div>
                    <div className="text-sm font-medium">{propertyData.bathrooms} salles de bain</div>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 text-primary font-bold text-lg">🏠</div>
                    <div className="text-sm font-medium">{propertyData.type}</div>
                  </div>
                </div>

                <Separator className="my-4" />

                <h4 className="font-medium mb-3">Équipements disponibles</h4>
                <div className="grid grid-cols-2 gap-3">
                  {propertyData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <amenity.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Avis des voyageurs</h3>
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{propertyData.rating}</span>
                    <span className="text-muted-foreground">({propertyData.reviewCount} avis)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {propertyData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">{review.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="sticky top-24 border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">{propertyData.price} DT</div>
                  <div className="text-muted-foreground">par nuit</div>
                </div>

                <Button className="w-full mb-4 h-12 text-lg" size="lg" onClick={handleWhatsAppContact}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contacter via WhatsApp
                </Button>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Réponse généralement sous</div>
                  <div className="text-sm font-medium text-primary">1 heure</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Informations rapides</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{propertyData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacité:</span>
                    <span>{propertyData.capacity} personnes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chambres:</span>
                    <span>{propertyData.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salles de bain:</span>
                    <span>{propertyData.bathrooms}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={closeLightbox}
            >
              <X className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={prevLightboxImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={nextLightboxImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="relative max-w-4xl max-h-full">
              <img
                src={propertyData.images[lightboxImageIndex] || "/placeholder.svg"}
                alt={`${propertyData.title} - Image ${lightboxImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              {lightboxImageIndex + 1} / {propertyData.images.length}
            </div>

            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto">
              {propertyData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${index === lightboxImageIndex ? "border-white" : "border-white/50"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Miniature ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showShareMenu && <div className="fixed inset-0 z-0" onClick={() => setShowShareMenu(false)} />}
    </div>
  )
}
