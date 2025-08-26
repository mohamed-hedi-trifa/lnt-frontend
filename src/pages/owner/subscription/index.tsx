"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  Home,
  Star,
  Bell,
  Plus,
  CreditCard,
  User,
  HelpCircle,
  Wallet,
  MapPin,
  Menu,
  X,
  Users,
  CalendarDays,
  Filter,
  Search,
  Receipt,
  CheckCircle,
  AlertCircle,
  Clock,
  Euro,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/owner/sidebar"

// Données simulées
const mockAnnonces = [
  {
    id: 1,
    titre: "Villa moderne avec piscine - Sidi Bou Said",
    ville: "Sidi Bou Said",
    datePublication: "2024-01-15",
    statut: "payee",
    montant: 50,
  },
  {
    id: 2,
    titre: "Appartement centre-ville Tunis",
    ville: "Tunis",
    datePublication: "2024-01-20",
    statut: "a_payer",
    montant: 50,
  },
  {
    id: 3,
    titre: "Maison traditionnelle La Marsa",
    ville: "La Marsa",
    datePublication: "2024-01-10",
    statut: "expiree",
    montant: 50,
  },
  {
    id: 4,
    titre: "Studio meublé Hammamet",
    ville: "Hammamet",
    datePublication: "2024-01-25",
    statut: "a_payer",
    montant: 50,
  },

]

const mockHistorique = [
  {
    id: 1,
    date: "2024-01-15",
    annonce: "Villa moderne avec piscine - Sidi Bou Said",
    methode: "Carte bancaire",
    montant: 50,
    statut: "payee",
  },
  {
    id: 2,
    date: "2024-01-10",
    annonce: "Maison traditionnelle La Marsa",
    methode: "D17",
    montant: 50,
    statut: "payee",
  },
  {
    id: 3,
    date: "2024-01-05",
    annonce: "Appartement vue mer Sousse",
    methode: "Carte bancaire",
    montant: 50,
    statut: "payee",
  },
]

export default function AbonnementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filtreStatut, setFiltreStatut] = useState("tous")
  const [recherche, setRecherche] = useState("")
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedAnnonce, setSelectedAnnonce] = useState<any>(null)
  const [methodePaiement, setMethodePaiement] = useState("")



  // Calculs KPI
  const totalPayeCeMois = mockHistorique
    .filter((h) => new Date(h.date).getMonth() === new Date().getMonth())
    .reduce((sum, h) => sum + h.montant, 0)

  const annoncesActives = mockAnnonces.filter((a) => a.statut === "payee").length
  const paiementsEnAttente = mockAnnonces.filter((a) => a.statut === "a_payer").length

  // Filtrage des annonces
  const annoncesFiltrees = mockAnnonces.filter((annonce) => {
    const matchStatut = filtreStatut === "tous" || annonce.statut === filtreStatut
    const matchRecherche =
      annonce.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      annonce.ville.toLowerCase().includes(recherche.toLowerCase())
    return matchStatut && matchRecherche
  })

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "payee":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Payée
          </Badge>
        )
      case "a_payer":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />À payer
          </Badge>
        )
      case "expiree":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Expirée
          </Badge>
        )
      default:
        return <Badge variant="outline">{statut}</Badge>
    }
  }

  const handlePaiement = () => {
    if (!methodePaiement) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive",
      })
      return
    }

    // Simuler le paiement
    toast({
      title: "Paiement réussi !",
      description: `L'annonce "${selectedAnnonce?.titre}" a été payée avec succès.`,
    })

    setPaymentModalOpen(false)
    setSelectedAnnonce(null)
    setMethodePaiement("")
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
                <h1 className="text-2xl font-serif font-bold text-foreground">Abonnement & Paiement</h1>
                <p className="text-muted-foreground">Gérez vos paiements d'annonces</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* KPI Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total payé ce mois</CardTitle>
                <Euro className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{totalPayeCeMois} DT</div>
                <p className="text-xs text-muted-foreground">Frais de publication</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annonces actives</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{annoncesActives}</div>
                <p className="text-xs text-muted-foreground">Annonces payées et publiées</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{paiementsEnAttente}</div>
                <p className="text-xs text-muted-foreground">{paiementsEnAttente * 50} DT à payer</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="annonces" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="annonces">Mes annonces</TabsTrigger>
              <TabsTrigger value="historique">Historique des paiements</TabsTrigger>
            </TabsList>

            {/* Onglet Annonces */}
            <TabsContent value="annonces" className="space-y-4">
              {/* Filtres et recherche */}
              {/* <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Rechercher par titre ou ville..."
                          value={recherche}
                          onChange={(e) => setRecherche(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={filtreStatut} onValueChange={setFiltreStatut}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tous">Toutes les annonces</SelectItem>
                        <SelectItem value="a_payer">À payer</SelectItem>
                        <SelectItem value="payee">Payées</SelectItem>
                        <SelectItem value="expiree">Expirées</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card> */}

              {/* Liste des annonces */}
              <div className="grid gap-4">
                {annoncesFiltrees.map((annonce) => (
                  <Card key={annonce.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-2">{annonce.titre}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {annonce.ville}
                            </div>
                            <div className="flex items-center">
                              <CalendarDays className="w-4 h-4 mr-1" />
                              {new Date(annonce.datePublication).toLocaleDateString("fr-FR")}
                            </div>
                            <div className="flex items-center">
                              <Euro className="w-4 h-4 mr-1" />
                              {annonce.montant} DT
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatutBadge(annonce.statut)}
                          {annonce.statut === "a_payer" && (
                            <Button
                              onClick={() => {
                                setSelectedAnnonce(annonce)
                                setPaymentModalOpen(true)
                              }}
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Payer 50 DT
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {annoncesFiltrees.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">Aucune annonce trouvée avec ces critères.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Onglet Historique */}
            <TabsContent value="historique" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des paiements</CardTitle>
                  <CardDescription>Tous vos paiements d'annonces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHistorique.map((paiement) => (
                      <div
                        key={paiement.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{paiement.annonce}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarDays className="w-4 h-4 mr-1" />
                              {new Date(paiement.date).toLocaleDateString("fr-FR")}
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-1" />
                              {paiement.methode}
                            </div>
                            <div className="flex items-center">
                              <Euro className="w-4 h-4 mr-1" />
                              {paiement.montant} DT
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatutBadge(paiement.statut)}
                          <Button variant="outline" size="sm">
                            <Receipt className="w-4 h-4 mr-2" />
                            Voir reçu
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modal de paiement */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary" />
              Paiement de l'annonce
            </DialogTitle>
            <DialogDescription>Confirmez le paiement pour publier votre annonce</DialogDescription>
          </DialogHeader>

          {selectedAnnonce && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">{selectedAnnonce.titre}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Montant à payer :</span>
                  <span className="font-bold text-primary text-lg">50 DT</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="methode">Méthode de paiement</Label>
                <Select value={methodePaiement} onValueChange={setMethodePaiement}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carte">Carte bancaire</SelectItem>
                    <SelectItem value="d17">D17</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)} className="w-full sm:w-auto">
              Annuler
            </Button>
            <Button onClick={handlePaiement} className="w-full sm:w-auto">
              <CreditCard className="w-4 h-4 mr-2" />
              Payer maintenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
