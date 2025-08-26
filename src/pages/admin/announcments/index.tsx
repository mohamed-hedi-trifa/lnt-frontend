"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  Home,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Eye,
  Check,
  XIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Données simulées
const statistiques = {
  enAttente: 23,
  actives: 892,
  rejetees: 45,
  hauteStanding: 67,
}

const annoncesData = [
  {
    id: 1,
    titre: "Villa moderne avec piscine - Sidi Bou Said",
    proprietaire: "Ahmed Ben Ali",
    ville: "Sidi Bou Said",
    dateCreation: "2024-01-15",
    statut: "en_attente",
    prix: 150,
    type: "Villa",
    description:
      "Magnifique villa moderne avec vue sur mer, piscine privée et jardin. Idéale pour des vacances en famille.",
    photos: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    surface: 200,
    pieces: 4,
    equipements: ["Piscine", "Climatisation", "WiFi", "Parking"],
  },
  {
    id: 2,
    titre: "Appartement centre-ville Tunis",
    proprietaire: "Fatma Trabelsi",
    ville: "Tunis",
    dateCreation: "2024-01-14",
    statut: "active",
    prix: 80,
    type: "Appartement",
    description: "Appartement moderne au cœur de Tunis, proche de tous les commerces et transports.",
    photos: ["/placeholder.svg?height=300&width=400"],
    surface: 90,
    pieces: 3,
    equipements: ["Climatisation", "WiFi", "Ascenseur"],
  },
  {
    id: 3,
    titre: "Studio Hammamet plage",
    proprietaire: "Mohamed Gharbi",
    ville: "Hammamet",
    dateCreation: "2024-01-13",
    statut: "rejetee",
    prix: 60,
    type: "Studio",
    description: "Studio cosy à 100m de la plage, parfait pour un couple.",
    photos: ["/placeholder.svg?height=300&width=400"],
    surface: 35,
    pieces: 1,
    equipements: ["WiFi", "Kitchenette"],
  },
]

const sidebarItems = [
  { icon: Home, label: "Tableau de bord", href: "/admin" },
  { icon: User, label: "Propriétaires", href: "/admin/proprietaires" },
  { icon: MapPin, label: "Annonces", href: "/admin/annonces", active: true },
  { icon: Calendar, label: "Réservations", href: "/admin/reservations" },
  { icon: CreditCard, label: "Paiements & Abonnements", href: "/admin/paiements" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: HelpCircle, label: "Support & Tickets", href: "/admin/support" },
  { icon: Settings, label: "Paramètres", href: "/admin/parametres" },
]

export default function AdminAnnonces() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [annonces, setAnnonces] = useState(annoncesData)
  const [filteredAnnonces, setFilteredAnnonces] = useState(annoncesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [villeFilter, setVilleFilter] = useState("toutes")
  const [proprietaireFilter, setProprietaireFilter] = useState("tous")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAnnonce, setSelectedAnnonce] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isHauteStanding, setIsHauteStanding] = useState(false)
  const itemsPerPage = 10

  // Filtrage des annonces
  useEffect(() => {
    const filtered = annonces.filter((annonce) => {
      const matchesSearch =
        annonce.titre.toLowerCase().includes(searchTerm.toLowerCase()) || annonce.id.toString().includes(searchTerm)
      const matchesStatus = statusFilter === "tous" || annonce.statut === statusFilter
      const matchesVille = villeFilter === "toutes" || annonce.ville === villeFilter
      const matchesProprietaire = proprietaireFilter === "tous" || annonce.proprietaire === proprietaireFilter

      return matchesSearch && matchesStatus && matchesVille && matchesProprietaire
    })

    setFilteredAnnonces(filtered)
    setCurrentPage(1)
  }, [annonces, searchTerm, statusFilter, villeFilter, proprietaireFilter])

  const handleAccepter = (annonceId, hauteStanding = false) => {
    setAnnonces((prev) =>
      prev.map((annonce) => (annonce.id === annonceId ? { ...annonce, statut: "active", hauteStanding } : annonce)),
    )

    toast({
      title: "Annonce acceptée",
      description: hauteStanding
        ? "L'annonce a été acceptée et marquée comme Haute Standing."
        : "L'annonce a été acceptée avec succès.",
    })

    setDetailsOpen(false)
    setIsHauteStanding(false)
  }

  const handleRejeter = (annonceId, raison) => {
    setAnnonces((prev) =>
      prev.map((annonce) =>
        annonce.id === annonceId ? { ...annonce, statut: "rejetee", raisonRejet: raison } : annonce,
      ),
    )

    toast({
      title: "Annonce rejetée",
      description: "L'annonce a été rejetée. Le propriétaire sera notifié.",
      variant: "destructive",
    })

    setDetailsOpen(false)
    setRejectReason("")
  }

  const getStatusBadge = (statut) => {
    switch (statut) {
      case "en_attente":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "rejetee":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XIcon className="w-3 h-3 mr-1" />
            Rejetée
          </Badge>
        )
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const villes = [...new Set(annonces.map((a) => a.ville))]
  const proprietaires = [...new Set(annonces.map((a) => a.proprietaire))]

  // Pagination
  const totalPages = Math.ceil(filteredAnnonces.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentAnnonces = filteredAnnonces.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Admin LNT</h2>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${item.active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-muted"}`}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-muted">
            <LogOut className="mr-3 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Contenu principal */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestion des annonces</h1>
                <p className="text-sm text-muted-foreground">Modération et validation des annonces</p>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="p-6 space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{statistiques.enAttente}</div>
                <p className="text-xs text-muted-foreground">À valider</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actives</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{statistiques.actives}</div>
                <p className="text-xs text-muted-foreground">Publiées</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejetées</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{statistiques.rejetees}</div>
                <p className="text-xs text-muted-foreground">Non conformes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Haute Standing</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">{statistiques.hauteStanding}</div>
                <p className="text-xs text-muted-foreground">Premium</p>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filtres et recherche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par titre ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="rejetee">Rejetée</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={villeFilter} onValueChange={setVilleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toutes">Toutes les villes</SelectItem>
                    {villes.map((ville) => (
                      <SelectItem key={ville} value={ville}>
                        {ville}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={proprietaireFilter} onValueChange={setProprietaireFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Propriétaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les propriétaires</SelectItem>
                    {proprietaires.map((proprietaire) => (
                      <SelectItem key={proprietaire} value={proprietaire}>
                        {proprietaire}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des annonces */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des annonces ({filteredAnnonces.length})</CardTitle>
              <CardDescription>
                Page {currentPage} sur {totalPages} • {filteredAnnonces.length} annonce(s) trouvée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Version desktop - Tableau */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Titre</th>
                        <th className="text-left p-2">Propriétaire</th>
                        <th className="text-left p-2">Ville</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Statut</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAnnonces.map((annonce) => (
                        <tr key={annonce.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div>
                              <p className="font-medium">{annonce.titre}</p>
                              <p className="text-sm text-muted-foreground">{annonce.prix} DT/nuit</p>
                            </div>
                          </td>
                          <td className="p-2">{annonce.proprietaire}</td>
                          <td className="p-2">{annonce.ville}</td>
                          <td className="p-2">{new Date(annonce.dateCreation).toLocaleDateString("fr-FR")}</td>
                          <td className="p-2">{getStatusBadge(annonce.statut)}</td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedAnnonce(annonce)
                                  setDetailsOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {annonce.statut === "en_attente" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 hover:bg-green-50 bg-transparent"
                                    onClick={() => handleAccepter(annonce.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:bg-red-50 bg-transparent"
                                    onClick={() => {
                                      setSelectedAnnonce(annonce)
                                      setDetailsOpen(true)
                                    }}
                                  >
                                    <XIcon className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Version mobile - Cartes */}
              <div className="md:hidden space-y-4">
                {currentAnnonces.map((annonce) => (
                  <Card key={annonce.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{annonce.titre}</h3>
                            <p className="text-xs text-muted-foreground">{annonce.proprietaire}</p>
                          </div>
                          {getStatusBadge(annonce.statut)}
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{annonce.ville}</span>
                          <span>{new Date(annonce.dateCreation).toLocaleDateString("fr-FR")}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => {
                              setSelectedAnnonce(annonce)
                              setDetailsOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {annonce.statut === "en_attente" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 bg-transparent"
                                onClick={() => handleAccepter(annonce.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 bg-transparent"
                                onClick={() => {
                                  setSelectedAnnonce(annonce)
                                  setDetailsOpen(true)
                                }}
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredAnnonces.length)} sur{" "}
                    {filteredAnnonces.length}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal de détails */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          {selectedAnnonce && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  {selectedAnnonce.titre}
                  {getStatusBadge(selectedAnnonce.statut)}
                </DialogTitle>
                <DialogDescription>
                  Propriétaire: {selectedAnnonce.proprietaire} • {selectedAnnonce.ville}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Photos */}
                <div>
                  <h3 className="font-medium mb-2">Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedAnnonce.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo || "/placeholder.svg"}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Informations générales</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Type:</span> {selectedAnnonce.type}
                      </p>
                      <p>
                        <span className="font-medium">Surface:</span> {selectedAnnonce.surface} m²
                      </p>
                      <p>
                        <span className="font-medium">Pièces:</span> {selectedAnnonce.pieces}
                      </p>
                      <p>
                        <span className="font-medium">Prix:</span> {selectedAnnonce.prix} DT/nuit
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Équipements</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedAnnonce.equipements.map((equipement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {equipement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{selectedAnnonce.description}</p>
                </div>

                {/* Actions pour annonces en attente */}
                {selectedAnnonce.statut === "en_attente" && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="haute-standing" checked={isHauteStanding} onCheckedChange={setIsHauteStanding} />
                      <label htmlFor="haute-standing" className="text-sm font-medium">
                        Marquer comme "Haute Standing"
                      </label>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Raison du rejet (optionnel)</label>
                      <Textarea
                        placeholder="Expliquez pourquoi cette annonce est rejetée..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                {selectedAnnonce.statut === "en_attente" && (
                  <>
                    <Button
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => handleRejeter(selectedAnnonce.id, rejectReason)}
                    >
                      <XIcon className="h-4 w-4 mr-2" />
                      Rejeter
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAccepter(selectedAnnonce.id, isHauteStanding)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accepter
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
