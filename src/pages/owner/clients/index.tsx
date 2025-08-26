"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  Home,
  Eye,
  Star,
  Bell,
  Plus,
  CreditCard,
  User,
  HelpCircle,
  Wallet,
  Menu,
  X,
  Search,
  Filter,
  Edit,
  Trash2,
  Phone,
  Copy,
  Users,
  Calendar,
  Grid3X3,
  List,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/owner/sidebar"

// Données simulées des clients
const mockClients = [
  {
    id: 1,
    name: "Sarah Mansouri",
    phone: "+216 98 123 456",
    reservations: 3,
    lastReservation: "2024-01-15",
    note: "Cliente fidèle, préfère les appartements avec vue mer",
    recentReservations: [
      { date: "2024-01-15", property: "Villa Sidi Bou Said", status: "Confirmée" },
      { date: "2023-12-20", property: "Appartement Tunis Centre", status: "Terminée" },
      { date: "2023-11-10", property: "Villa Sidi Bou Said", status: "Terminée" },
    ],
  },
  {
    id: 2,
    name: "Mohamed Ben Ali",
    phone: "+216 22 987 654",
    reservations: 1,
    lastReservation: "2024-01-10",
    note: "Voyage d'affaires régulier",
    recentReservations: [{ date: "2024-01-10", property: "Appartement Tunis Centre", status: "En cours" }],
  },
  {
    id: 3,
    name: "Fatima Trabelsi",
    phone: "+216 55 456 789",
    reservations: 5,
    lastReservation: "2024-01-20",
    note: "Famille nombreuse, demande toujours des équipements pour enfants",
    recentReservations: [
      { date: "2024-01-20", property: "Maison La Marsa", status: "Confirmée" },
      { date: "2023-12-15", property: "Villa Sidi Bou Said", status: "Terminée" },
      { date: "2023-11-25", property: "Maison La Marsa", status: "Terminée" },
    ],
  },
  {
    id: 4,
    name: "Ahmed Khelifi",
    phone: "+216 71 234 567",
    reservations: 2,
    lastReservation: "2024-01-05",
    note: "",
    recentReservations: [
      { date: "2024-01-05", property: "Appartement Tunis Centre", status: "Terminée" },
      { date: "2023-10-15", property: "Villa Sidi Bou Said", status: "Terminée" },
    ],
  },
]

export default function ClientsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    note: "",
  })



  // Filtrer les clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone.includes(searchTerm)

    if (filterBy === "recent") {
      const lastReservationDate = new Date(client.lastReservation)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return matchesSearch && lastReservationDate >= thirtyDaysAgo
    }

    if (filterBy === "with-notes") {
      return matchesSearch && client.note.trim() !== ""
    }

    return matchesSearch
  })

  const handleAddClient = () => {
    setEditingClient(null)
    setFormData({ name: "", phone: "", note: "" })
    setIsAddEditModalOpen(true)
  }

  const handleEditClient = (client: any) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      phone: client.phone,
      note: client.note,
    })
    setIsAddEditModalOpen(true)
  }

  const handleSaveClient = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom et le téléphone sont obligatoires",
        variant: "destructive",
      })
      return
    }

    if (editingClient) {
      // Modifier client existant
      setClients(clients.map((client) => (client.id === editingClient.id ? { ...client, ...formData } : client)))
      toast({
        title: "Client modifié",
        description: "Les informations du client ont été mises à jour",
      })
    } else {
      // Ajouter nouveau client
      const newClient = {
        id: Math.max(...clients.map((c) => c.id)) + 1,
        ...formData,
        reservations: 0,
        lastReservation: "",
        recentReservations: [],
      }
      setClients([...clients, newClient])
      toast({
        title: "Client ajouté",
        description: "Le nouveau client a été ajouté avec succès",
      })
    }

    setIsAddEditModalOpen(false)
    setFormData({ name: "", phone: "", note: "" })
  }

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter((client) => client.id !== clientId))
    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé définitivement",
    })
  }

  const handleViewDetails = (client: any) => {
    setSelectedClient(client)
    setIsDetailsModalOpen(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copié",
      description: "Le texte a été copié dans le presse-papiers",
    })
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
                <h1 className="text-2xl font-serif font-bold text-foreground">Gestion des clients</h1>
                <p className="text-muted-foreground">Gérez vos clients et leurs réservations</p>
              </div>
            </div>
            <Button onClick={handleAddClient}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un client
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Rechercher par nom ou téléphone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les clients</SelectItem>
                      <SelectItem value="recent">Clients récents (30j)</SelectItem>
                      <SelectItem value="with-notes">Avec notes privées</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clients List/Grid */}
          {filteredClients.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun client trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterBy !== "all"
                    ? "Aucun client ne correspond à vos critères de recherche."
                    : "Vous n'avez pas encore de clients enregistrés."}
                </p>
                {!searchTerm && filterBy === "all" && (
                  <Button onClick={handleAddClient}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter votre premier client
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : viewMode === "list" ? (
            <Card>
              <CardHeader>
                <CardTitle>Liste des clients ({filteredClients.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Client</th>
                        <th className="p-4 font-medium">Téléphone</th>
                        <th className="p-4 font-medium">Réservations</th>
                        <th className="p-4 font-medium">Dernière réservation</th>
                        <th className="p-4 font-medium">Note privée</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="font-medium">{client.name}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{client.phone}</span>
                              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(client.phone)}>
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{client.reservations}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              {client.lastReservation ? (
                                new Date(client.lastReservation).toLocaleDateString("fr-FR")
                              ) : (
                                <span className="text-muted-foreground">Aucune</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm max-w-xs truncate">
                              {client.note || <span className="text-muted-foreground">Aucune note</span>}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewDetails(client)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Supprimer le client</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteClient(client.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map((client) => (
                <Card key={client.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-1 mt-1">
                          <Phone className="w-3 h-3" />
                          <span>{client.phone}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(client)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Réservations</span>
                        <Badge variant="secondary">{client.reservations}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Dernière réservation</span>
                        <span className="text-sm">
                          {client.lastReservation
                            ? new Date(client.lastReservation).toLocaleDateString("fr-FR")
                            : "Aucune"}
                        </span>
                      </div>
                      {client.note && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground line-clamp-2">{client.note}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Client Modal */}
      <Dialog open={isAddEditModalOpen} onOpenChange={setIsAddEditModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>{editingClient ? "Modifier le client" : "Ajouter un client"}</DialogTitle>
            <DialogDescription>
              {editingClient
                ? "Modifiez les informations du client ci-dessous."
                : "Ajoutez un nouveau client à votre liste."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Sarah Mansouri"
              />
            </div>
            <div>
              <Label htmlFor="phone">Numéro de téléphone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ex: +216 98 123 456"
              />
            </div>
            <div>
              <Label htmlFor="note">Note privée</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Informations utiles sur ce client..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEditModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveClient}>{editingClient ? "Mettre à jour" : "Ajouter"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Détails du client</DialogTitle>
            <DialogDescription>Informations complètes et historique des réservations</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nom complet</Label>
                  <p className="text-lg font-medium">{selectedClient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Téléphone</Label>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg">{selectedClient.phone}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedClient.phone)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nombre de réservations</Label>
                  <p className="text-lg font-medium">{selectedClient.reservations}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Dernière réservation</Label>
                  <p className="text-lg">
                    {selectedClient.lastReservation
                      ? new Date(selectedClient.lastReservation).toLocaleDateString("fr-FR")
                      : "Aucune"}
                  </p>
                </div>
              </div>

              {selectedClient.note && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Note privée</Label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{selectedClient.note}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => copyToClipboard(selectedClient.note)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copier la note
                    </Button>
                  </div>
                </div>
              )}

              {selectedClient.recentReservations.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Réservations récentes</Label>
                  <div className="mt-2 space-y-2">
                    {selectedClient.recentReservations.map((reservation: { property: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; date: string | number | Date; status: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg bg-[#dfdfdf]">
                        <div>
                          <p className="font-medium">{reservation.property}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(reservation.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <Badge
                          variant={
                            reservation.status === "Confirmée"
                              ? "default"
                              : reservation.status === "En cours"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
