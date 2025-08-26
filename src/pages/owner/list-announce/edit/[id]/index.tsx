"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
  Edit,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Sidebar from "@/components/owner/sidebar"

export default function ModifierAnnonce() {
  const params = 1
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    const loadAnnonceData = async () => {
      // Simulation d'un appel API pour récupérer les données de l'annonce
      setTimeout(() => {
        setFormData({
          title: "Villa moderne avec piscine - Sidi Bou Said",
          type: "villa",
          city: "tunis",
          district: "Sidi Bou Said",
          address: "15 Avenue Habib Bourguiba, Sidi Bou Said",
          surface: "180",
          rooms: "4",
          floor: "rdc",
          furnished: "furnished",
          priceType: "night",
          price: "250",
          availability: "now",
          startDate: "",
          endDate: "",
          description:
            "Magnifique villa moderne située dans le prestigieux quartier de Sidi Bou Said. Cette propriété exceptionnelle offre une vue imprenable sur la mer Méditerranée et dispose d'une piscine privée. Parfaitement équipée et décorée avec goût, elle constitue un havre de paix idéal pour vos vacances en Tunisie.",
          phone: "+216 98 765 432",
          latitude: 36.8065,
          longitude: 10.1815,
        })
        setSelectedAmenities(["wifi", "parking", "tv", "ac", "pool"])
        setSelectedRules(["pets"])
        setPreviewImages([
          "/moderne-villa-tunisie-piscine.png",
          "/modern-tunisian-villa-living-room.png",
          "/sidi-bou-said-villa-bedroom.png",
          "/modern-villa-kitchen.png",
        ])
        setLoading(false)
      }, 1000)
    }

    loadAnnonceData()
  }, [params])



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
    console.log("Mise à jour de l'annonce:", formData)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des données de l'annonce...</p>
        </div>
      </div>
    )
  }

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
                <h1 className="text-2xl font-serif font-bold text-foreground">Modifier l'annonce</h1>
                <p className="text-muted-foreground">Mettez à jour les informations de votre logement</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard/annonces">
                  <Eye className="w-4 h-4 mr-2" />
                  Mes annonces
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/logement/${params}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Voir l'annonce
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <div className="p-4 lg:p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
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
                  Enregistrer les modifications
                </Button>

                {currentStep < 4 ? (
                  <Button type="button" onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}>
                    Suivant
                  </Button>
                ) : (
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Edit className="w-4 h-4 mr-2" />
                    Mettre à jour l'annonce
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
