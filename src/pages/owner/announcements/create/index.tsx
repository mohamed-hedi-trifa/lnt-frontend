"use client"

import React from "react"


import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import {
  Home,
  MapPin,
  Plus,
  Menu,
  X,
  Star,
  Bell,
  CreditCard,
  User,
  HelpCircle,
  Wallet,
  Upload,
  Trash2,
  Camera,
  Wifi,
  Car,
  Tv,
  Snowflake,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Shield,
  PawPrint,
  Cigarette,
  Users,
  Save,
  Eye,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/owner/sidebar"

// Import dynamique de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(() => import("@/components/owner/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">Chargement de la carte...</div>
  ),
})

export default function CreerAnnonce() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // État du formulaire
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    city: "",
    district: "",
    address: "",
    surface: "",
    rooms: "",
    floor: "",
    furnished: "",
    priceType: "night",
    price: "",
    availability: "now",
    startDate: "",
    endDate: "",
    description: "",
    phone: "",
    latitude: 36.8065,
    longitude: 10.1815,
  })

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedRules, setSelectedRules] = useState<string[]>([])



  const amenities = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "tv", label: "Télévision", icon: Tv },
    { id: "ac", label: "Climatisation", icon: Snowflake },
    { id: "kitchen", label: "Cuisine équipée", icon: UtensilsCrossed },
    { id: "pool", label: "Piscine", icon: Waves },
    { id: "gym", label: "Salle de sport", icon: Dumbbell },
    { id: "security", label: "Sécurité 24h/24", icon: Shield },
  ]

  const rules = [
    { id: "pets", label: "Animaux autorisés", icon: PawPrint },
    { id: "smoking", label: "Fumeurs autorisés", icon: Cigarette },
    { id: "parties", label: "Fêtes autorisées", icon: Users },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      setSelectedImages((prev) => [...prev, ...files])

      // Créer les aperçus
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewImages((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const handleRuleToggle = (ruleId: string) => {
    setSelectedRules((prev) => (prev.includes(ruleId) ? prev.filter((id) => id !== ruleId) : [...prev, ruleId]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de soumission
    console.log("Données du formulaire:", formData)
    console.log("Équipements:", selectedAmenities)
    console.log("Règles:", selectedRules)
    console.log("Images:", selectedImages)
  }

  const steps = [
    { id: 1, title: "Informations générales", description: "Type, localisation et caractéristiques" },
    { id: 2, title: "Prix et disponibilité", description: "Tarifs et périodes de location" },
    { id: 3, title: "Description et équipements", description: "Détails et services inclus" },
    { id: 4, title: "Photos et finalisation", description: "Galerie photos et publication" },
  ]

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
                <h1 className="text-2xl font-serif font-bold text-foreground">Créer une annonce</h1>
                <p className="text-muted-foreground">Publiez votre logement en quelques étapes</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard/annonces">
                  <Eye className="w-4 h-4 mr-2" />
                  Mes annonces
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 lg:p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            {/* Étape 1: Informations générales */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de base</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre de l'annonce *</Label>
                      <Input
                        id="title"
                        placeholder="Ex: Villa moderne avec piscine - Sidi Bou Said"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type de logement *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="appartement">Appartement</SelectItem>
                            <SelectItem value="maison">Maison</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la ville" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tunis">Tunis</SelectItem>
                            <SelectItem value="sfax">Sfax</SelectItem>
                            <SelectItem value="sousse">Sousse</SelectItem>
                            <SelectItem value="monastir">Monastir</SelectItem>
                            <SelectItem value="hammamet">Hammamet</SelectItem>
                            <SelectItem value="nabeul">Nabeul</SelectItem>
                            <SelectItem value="bizerte">Bizerte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="district">Quartier</Label>
                      <Input
                        id="district"
                        placeholder="Ex: Sidi Bou Said, Centre-ville..."
                        value={formData.district}
                        onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse complète *</Label>
                      <Input
                        id="address"
                        placeholder="Adresse exacte du logement"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Localisation sur la carte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Carte interactive (Leaflet) - Cliquez pour placer le marqueur
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Cliquez sur la carte pour positionner précisément votre logement
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Caractéristiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="surface">Surface (m²) *</Label>
                        <Input
                          id="surface"
                          type="number"
                          placeholder="120"
                          value={formData.surface}
                          onChange={(e) => setFormData((prev) => ({ ...prev, surface: e.target.value }))}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="rooms">Nombre de pièces *</Label>
                        <Select
                          value={formData.rooms}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, rooms: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pièces" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 pièce</SelectItem>
                            <SelectItem value="2">2 pièces</SelectItem>
                            <SelectItem value="3">3 pièces</SelectItem>
                            <SelectItem value="4">4 pièces</SelectItem>
                            <SelectItem value="5">5 pièces</SelectItem>
                            <SelectItem value="6+">6+ pièces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="floor">Étage</Label>
                        <Select
                          value={formData.floor}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, floor: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Étage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rdc">Rez-de-chaussée</SelectItem>
                            <SelectItem value="1">1er étage</SelectItem>
                            <SelectItem value="2">2ème étage</SelectItem>
                            <SelectItem value="3">3ème étage</SelectItem>
                            <SelectItem value="4+">4ème étage et +</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Meublé *</Label>
                      <Select
                        value={formData.furnished}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, furnished: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furnished">Meublé</SelectItem>
                          <SelectItem value="unfurnished">Non meublé</SelectItem>
                          <SelectItem value="semi-furnished">Semi-meublé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Étape 2: Prix et disponibilité */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tarification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Type de location *</Label>
                        <Select
                          value={formData.priceType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, priceType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="night">Par nuit</SelectItem>
                            <SelectItem value="month">Par mois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="price">Prix (DT) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder={formData.priceType === "night" ? "120" : "800"}
                          value={formData.price}
                          onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Disponibilité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Période de disponibilité *</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Disponible maintenant</SelectItem>
                          <SelectItem value="dates">Dates spécifiques</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.availability === "dates" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Date de début</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                          />
                        </div>

                        <div>
                          <Label htmlFor="endDate">Date de fin</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="phone">Numéro de téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+216 XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Ce numéro sera utilisé pour les contacts WhatsApp
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Étape 3: Description et équipements */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="description">Description complète *</Label>
                      <Textarea
                        id="description"
                        placeholder="Décrivez votre logement en détail : ambiance, équipements, quartier, transports..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Équipements et services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() => handleAmenityToggle(amenity.id)}
                          />
                          <Label htmlFor={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                            <amenity.icon className="w-4 h-4" />
                            <span className="text-sm">{amenity.label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Règles du logement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rules.map((rule) => (
                        <div key={rule.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={rule.id}
                            checked={selectedRules.includes(rule.id)}
                            onCheckedChange={() => handleRuleToggle(rule.id)}
                          />
                          <Label htmlFor={rule.id} className="flex items-center space-x-2 cursor-pointer">
                            <rule.icon className="w-4 h-4" />
                            <span>{rule.label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Étape 4: Photos et finalisation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Galerie photos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Ajoutez des photos de votre logement</p>
                      <p className="text-muted-foreground mb-4">Glissez-déposez vos images ou cliquez pour parcourir</p>
                      <Button type="button" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Choisir des fichiers
                      </Button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={preview || "/placeholder.svg"}
                              alt={`Aperçu ${index + 1}`}
                              width={200}
                              height={150}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2 bg-primary">Photo principale</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Récapitulatif</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Titre:</p>
                        <p className="text-muted-foreground">{formData.title || "Non renseigné"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Type:</p>
                        <p className="text-muted-foreground">{formData.type || "Non renseigné"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Localisation:</p>
                        <p className="text-muted-foreground">
                          {formData.city && formData.district
                            ? `${formData.district}, ${formData.city}`
                            : formData.city || "Non renseigné"}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Prix:</p>
                        <p className="text-muted-foreground">
                          {formData.price
                            ? `${formData.price} DT/${formData.priceType === "night" ? "nuit" : "mois"}`
                            : "Non renseigné"}
                        </p>
                      </div>
                    </div>

                    {selectedAmenities.length > 0 && (
                      <div>
                        <p className="font-medium mb-2">Équipements sélectionnés:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedAmenities.map((amenityId) => {
                            const amenity = amenities.find((a) => a.id === amenityId)
                            return amenity ? (
                              <Badge key={amenityId} variant="secondary">
                                {amenity.label}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>

              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer le brouillon
                </Button>

                {currentStep < 4 ? (
                  <Button type="button" onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}>
                    Suivant
                  </Button>
                ) : (
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Publier l'annonce
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
