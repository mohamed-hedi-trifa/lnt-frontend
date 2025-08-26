"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
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
  Edit,
  Filter,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Building,
  Users,
} from "lucide-react"

// Données simulées des propriétaires
const proprietairesData = [
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    email: "ahmed.benali@email.com",
    telephone: "+216 98 123 456",
    whatsapp: "+216 98 123 456",
    type: "particulier",
    annonces: 3,
    statut: "actif",
  },
  {
    id: 2,
    nom: "Fatma Trabelsi",
    email: "fatma.trabelsi@email.com",
    telephone: "+216 97 234 567",
    whatsapp: "+216 97 234 567",
    type: "professionnel",
    annonces: 8,
    statut: "actif",
  },
  {
    id: 3,
    nom: "Mohamed Gharbi",
    email: "mohamed.gharbi@email.com",
    telephone: "+216 99 345 678",
    whatsapp: "+216 99 345 678",
    type: "particulier",
    annonces: 1,
    statut: "en_attente",
  },
  {
    id: 4,
    nom: "Leila Mansouri",
    email: "leila.mansouri@email.com",
    telephone: "+216 96 456 789",
    whatsapp: "+216 96 456 789",
    type: "professionnel",
    annonces: 12,
    statut: "actif",
  },
  {
    id: 5,
    nom: "Karim Bouazizi",
    email: "karim.bouazizi@email.com",
    telephone: "+216 95 567 890",
    whatsapp: "+216 95 567 890",
    type: "particulier",
    annonces: 0,
    statut: "inactif",
  },
]

const sidebarItems = [
  { icon: Home, label: "Tableau de bord", href: "/admin" },
  { icon: User, label: "Propriétaires", href: "/admin/proprietaires", active: true },
  { icon: MapPin, label: "Annonces", href: "/admin/annonces" },
  { icon: Calendar, label: "Réservations", href: "/admin/reservations" },
  { icon: CreditCard, label: "Paiements & Abonnements", href: "/admin/paiements" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: HelpCircle, label: "Support & Tickets", href: "/admin/support" },
  { icon: Settings, label: "Paramètres", href: "/admin/parametres" },
]

export default function ProprietairesAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [proprietaires, setProprietaires] = useState(proprietairesData)
  const [filteredProprietaires, setFilteredProprietaires] = useState(proprietairesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [typeFilter, setTypeFilter] = useState("tous")
  const [annoncesFilter, setAnnoncesFilter] = useState("tous")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProprietaire, setEditingProprietaire] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const itemsPerPage = 10

  // Filtrage et recherche
  useEffect(() => {
    let filtered = proprietaires

    // Recherche par nom, email ou téléphone
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.telephone.includes(searchTerm),
      )
    }

    // Filtre par statut
    if (statusFilter !== "tous") {
      filtered = filtered.filter((p) => p.statut === statusFilter)
    }

    // Filtre par type
    if (typeFilter !== "tous") {
      filtered = filtered.filter((p) => p.type === typeFilter)
    }

    // Filtre par nombre d'annonces
    if (annoncesFilter !== "tous") {
      if (annoncesFilter === "aucune") {
        filtered = filtered.filter((p) => p.annonces === 0)
      } else if (annoncesFilter === "1-5") {
        filtered = filtered.filter((p) => p.annonces >= 1 && p.annonces <= 5)
      } else if (annoncesFilter === "6+") {
        filtered = filtered.filter((p) => p.annonces >= 6)
      }
    }

    setFilteredProprietaires(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, typeFilter, annoncesFilter, proprietaires])

  // Pagination
  const totalPages = Math.ceil(filteredProprietaires.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProprietaires = filteredProprietaires.slice(startIndex, endIndex)

  // Fonction pour ouvrir le modal d'édition
  const handleEdit = (proprietaire) => {
    setEditingProprietaire({ ...proprietaire })
    setIsEditModalOpen(true)
  }

  // Fonction pour sauvegarder les modifications
  const handleSave = () => {
    setProprietaires(proprietaires.map((p) => (p.id === editingProprietaire.id ? editingProprietaire : p)))
    setIsEditModalOpen(false)
    setEditingProprietaire(null)
    toast({
      title: "Propriétaire modifié",
      description: "Les informations ont été mises à jour avec succès.",
    })
  }

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (statut) => {
    switch (statut) {
      case "actif":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
      case "inactif":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactif</Badge>
      case "en_attente":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">En attente</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  // Fonction pour obtenir le badge de type
  const getTypeBadge = (type) => {
    return type === "professionnel" ? (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Professionnel</Badge>
    ) : (
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Particulier</Badge>
    )
  }

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
                <h1 className="text-2xl font-bold text-foreground">Gestion des propriétaires</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredProprietaires.length} propriétaire{filteredProprietaires.length > 1 ? "s" : ""} trouvé
                  {filteredProprietaires.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Admin Principal</p>
                <p className="text-xs text-muted-foreground">Administrateur</p>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="p-6 space-y-6">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{proprietaires.length}</p>
                    <p className="text-sm text-muted-foreground">Total propriétaires</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {proprietaires.filter((p) => p.statut === "actif").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {proprietaires.filter((p) => p.type === "professionnel").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Professionnels</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-600">
                      {proprietaires.reduce((sum, p) => sum + p.annonces, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total annonces</p>
                  </div>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Barre de recherche */}
                <div className="lg:col-span-2">
                  <Label htmlFor="search">Rechercher</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Nom, email ou téléphone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filtre par statut */}
                <div>
                  <Label htmlFor="status-filter">Statut</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous les statuts</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="inactif">Inactif</SelectItem>
                      <SelectItem value="en_attente">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtre par type */}
                <div>
                  <Label htmlFor="type-filter">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous les types</SelectItem>
                      <SelectItem value="particulier">Particulier</SelectItem>
                      <SelectItem value="professionnel">Professionnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtre par nombre d'annonces */}
                <div>
                  <Label htmlFor="annonces-filter">Annonces</Label>
                  <Select value={annoncesFilter} onValueChange={setAnnoncesFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Toutes</SelectItem>
                      <SelectItem value="aucune">Aucune (0)</SelectItem>
                      <SelectItem value="1-5">1 à 5</SelectItem>
                      <SelectItem value="6+">6 ou plus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des propriétaires */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des propriétaires</CardTitle>
              <CardDescription>
                Affichage de {startIndex + 1} à {Math.min(endIndex, filteredProprietaires.length)} sur{" "}
                {filteredProprietaires.length} propriétaires
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Vue desktop - Tableau */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom complet</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Annonces</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProprietaires.map((proprietaire) => (
                      <TableRow key={proprietaire.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{proprietaire.nom}</p>
                            <p className="text-sm text-muted-foreground">{proprietaire.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {proprietaire.telephone}
                            </div>
                            <div className="flex items-center text-sm">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              {proprietaire.whatsapp}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(proprietaire.type)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{proprietaire.annonces}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(proprietaire.statut)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(proprietaire)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Vue mobile - Cartes */}
              <div className="md:hidden space-y-4">
                {currentProprietaires.map((proprietaire) => (
                  <Card key={proprietaire.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{proprietaire.nom}</h3>
                          <p className="text-sm text-muted-foreground">{proprietaire.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          {getStatusBadge(proprietaire.statut)}
                          {getTypeBadge(proprietaire.type)}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2" />
                          {proprietaire.telephone}
                        </div>
                        <div className="flex items-center text-sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {proprietaire.whatsapp}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {proprietaire.annonces} annonce{proprietaire.annonces > 1 ? "s" : ""}
                        </div>
                      </div>

                      <Button size="sm" variant="outline" onClick={() => handleEdit(proprietaire)} className="w-full">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} sur {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal d'édition */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Modifier le propriétaire</DialogTitle>
            <DialogDescription>
              Modifiez les informations du propriétaire. Cliquez sur "Sauvegarder" pour enregistrer les changements.
            </DialogDescription>
          </DialogHeader>

          {editingProprietaire && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nom" className="text-right">
                  Nom complet
                </Label>
                <Input
                  id="edit-nom"
                  value={editingProprietaire.nom}
                  onChange={(e) => setEditingProprietaire({ ...editingProprietaire, nom: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingProprietaire.email}
                  onChange={(e) => setEditingProprietaire({ ...editingProprietaire, email: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-telephone" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="edit-telephone"
                  value={editingProprietaire.telephone}
                  onChange={(e) => setEditingProprietaire({ ...editingProprietaire, telephone: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-whatsapp" className="text-right">
                  WhatsApp
                </Label>
                <Input
                  id="edit-whatsapp"
                  value={editingProprietaire.whatsapp}
                  onChange={(e) => setEditingProprietaire({ ...editingProprietaire, whatsapp: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={editingProprietaire.type}
                  onValueChange={(value) => setEditingProprietaire({ ...editingProprietaire, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="particulier">Particulier</SelectItem>
                    <SelectItem value="professionnel">Professionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-statut" className="text-right">
                  Statut
                </Label>
                <Select
                  value={editingProprietaire.statut}
                  onValueChange={(value) => setEditingProprietaire({ ...editingProprietaire, statut: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                    <SelectItem value="en_attente">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
