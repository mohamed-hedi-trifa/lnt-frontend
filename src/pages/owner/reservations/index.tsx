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
  Grid3X3,
  List,
  MapPin,
  Users,
  CalendarDays,
  Euro,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/owner/sidebar"

// Données simulées des réservations
const mockReservations = [
  {
    id: 1,
    clientName: "Sarah Mansouri",
    clientPhone: "+216 98 123 456",
    propertyName: "Villa Sidi Bou Said",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    status: "confirmed",
    totalAmount: 750,
    amountPaid: 750,
    nightsBooked: 5,
    nightsPaid: 5,
    note: "Arrivée prévue vers 15h",
  },
  {
    id: 2,
    clientName: "Mohamed Ben Ali",
    clientPhone: "+216 22 987 654",
    propertyName: "Appartement Tunis Centre",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    status: "pending",
    totalAmount: 200,
    amountPaid: 100,
    nightsBooked: 2,
    nightsPaid: 1,
    note: "Voyage d'affaires",
  },
  {
    id: 3,
    clientName: "Fatima Trabelsi",
    clientPhone: "+216 55 456 789",
    propertyName: "Maison La Marsa",
    startDate: "2024-01-25",
    endDate: "2024-01-30",
    status: "cancelled",
    totalAmount: 600,
    amountPaid: 0,
    nightsBooked: 5,
    nightsPaid: 0,
    note: "Annulation pour raisons familiales",
  },
  {
    id: 4,
    clientName: "Ahmed Khelifi",
    clientPhone: "+216 71 234 567",
    propertyName: "Villa Sidi Bou Said",
    startDate: "2024-03-01",
    endDate: "2024-03-05",
    status: "confirmed",
    totalAmount: 600,
    amountPaid: 300,
    nightsBooked: 4,
    nightsPaid: 2,
    note: "",
  },
]

const mockProperties = [
  { id: 1, name: "Villa Sidi Bou Said" },
  { id: 2, name: "Appartement Tunis Centre" },
  { id: 3, name: "Maison La Marsa" },
]

export default function ReservationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reservations, setReservations] = useState(mockReservations)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<any>(null)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [formData, setFormData] = useState({
    clientName: "",
    propertyId: "",
    startDate: "",
    endDate: "",
    status: "pending",
    totalAmount: "",
    amountPaid: "",
    note: "",
  })

  // Fonction pour calculer le statut de paiement
  const getPaymentStatus = (reservation: any) => {
    if (reservation.amountPaid === 0) return "unpaid"
    if (reservation.amountPaid >= reservation.totalAmount) return "paid"
    return "partial"
  }

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmée
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Annulée
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Fonction pour obtenir le badge de paiement
  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Payé</Badge>
      case "partial":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Partiel</Badge>
      case "unpaid":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Impayé</Badge>
      default:
        return <Badge variant="secondary">{paymentStatus}</Badge>
    }
  }

  // Filtrer et trier les réservations
  const filteredAndSortedReservations = reservations
    .filter((reservation) => {
      const matchesSearch =
        reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.propertyName.toLowerCase().includes(searchTerm.toLowerCase())

      if (filterBy === "confirmed") return matchesSearch && reservation.status === "confirmed"
      if (filterBy === "pending") return matchesSearch && reservation.status === "pending"
      if (filterBy === "cancelled") return matchesSearch && reservation.status === "cancelled"
      if (filterBy === "unpaid") return matchesSearch && getPaymentStatus(reservation) === "unpaid"

      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      if (sortBy === "amount") return b.totalAmount - a.totalAmount
      return 0
    })

  const handleAddReservation = () => {
    setEditingReservation(null)
    setFormData({
      clientName: "",
      propertyId: "",
      startDate: "",
      endDate: "",
      status: "pending",
      totalAmount: "",
      amountPaid: "",
      note: "",
    })
    setIsAddEditModalOpen(true)
  }

  const handleEditReservation = (reservation: any) => {
    setEditingReservation(reservation)
    setFormData({
      clientName: reservation.clientName,
      propertyId: reservation.propertyName,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      totalAmount: reservation.totalAmount.toString(),
      amountPaid: reservation.amountPaid.toString(),
      note: reservation.note,
    })
    setIsAddEditModalOpen(true)
  }

  const handleSaveReservation = () => {
    if (!formData.clientName.trim() || !formData.propertyId || !formData.startDate || !formData.endDate) {
      toast({
        title: "Erreur",
        description: "Tous les champs obligatoires doivent être remplis",
        variant: "destructive",
      })
      return
    }

    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const nightsBooked = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    if (editingReservation) {
      // Modifier réservation existante
      setReservations(
        reservations.map((reservation) =>
          reservation.id === editingReservation.id
            ? {
              ...reservation,
              ...formData,
              totalAmount: Number.parseFloat(formData.totalAmount),
              amountPaid: Number.parseFloat(formData.amountPaid),
              nightsBooked,
              nightsPaid: Math.floor(
                (Number.parseFloat(formData.amountPaid) / Number.parseFloat(formData.totalAmount)) * nightsBooked,
              ),
              propertyName:
                mockProperties.find((p) => p.id.toString() === formData.propertyId)?.name || formData.propertyId,
            }
            : reservation,
        ),
      )
      toast({
        title: "Réservation modifiée",
        description: "La réservation a été mise à jour avec succès",
      })
    } else {
      // Ajouter nouvelle réservation
      const newReservation = {
        id: Math.max(...reservations.map((r) => r.id)) + 1,
        ...formData,
        clientPhone: "+216 XX XXX XXX", // À récupérer depuis la base de clients
        totalAmount: Number.parseFloat(formData.totalAmount),
        amountPaid: Number.parseFloat(formData.amountPaid),
        nightsBooked,
        nightsPaid: Math.floor(
          (Number.parseFloat(formData.amountPaid) / Number.parseFloat(formData.totalAmount)) * nightsBooked,
        ),
        propertyName: mockProperties.find((p) => p.id.toString() === formData.propertyId)?.name || formData.propertyId,
      }
      setReservations([...reservations, newReservation])
      toast({
        title: "Réservation ajoutée",
        description: "La nouvelle réservation a été créée avec succès",
      })
    }

    setIsAddEditModalOpen(false)
  }

  const handleDeleteReservation = (reservationId: number) => {
    setReservations(reservations.filter((reservation) => reservation.id !== reservationId))
    toast({
      title: "Réservation supprimée",
      description: "La réservation a été supprimée définitivement",
    })
  }

  const handleViewDetails = (reservation: any) => {
    setSelectedReservation(reservation)
    setIsDetailsModalOpen(true)
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
                <h1 className="text-2xl font-serif font-bold text-foreground">Gestion des réservations</h1>
                <p className="text-muted-foreground">Gérez toutes vos réservations et paiements</p>
              </div>
            </div>
            <Button onClick={handleAddReservation}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle réservation
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Rechercher par client ou propriété..."
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
                      <SelectItem value="all">Toutes les réservations</SelectItem>
                      <SelectItem value="confirmed">Confirmées</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="cancelled">Annulées</SelectItem>
                      <SelectItem value="unpaid">Impayées</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Trier par date</SelectItem>
                      <SelectItem value="amount">Trier par montant</SelectItem>
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

          {/* Reservations List/Grid */}
          {filteredAndSortedReservations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune réservation trouvée</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterBy !== "all"
                    ? "Aucune réservation ne correspond à vos critères de recherche."
                    : "Vous n'avez pas encore de réservations enregistrées."}
                </p>
                {!searchTerm && filterBy === "all" && (
                  <Button onClick={handleAddReservation}>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer votre première réservation
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : viewMode === "list" ? (
            <Card>
              <CardHeader>
                <CardTitle>Liste des réservations ({filteredAndSortedReservations.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Client</th>
                        <th className="p-4 font-medium">Propriété</th>
                        <th className="p-4 font-medium">Dates</th>
                        <th className="p-4 font-medium">Statut</th>
                        <th className="p-4 font-medium">Montant</th>
                        <th className="p-4 font-medium">Paiement</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedReservations.map((reservation) => {
                        const paymentStatus = getPaymentStatus(reservation)
                        const remainingBalance = reservation.totalAmount - reservation.amountPaid

                        return (
                          <tr key={reservation.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <div className="font-medium">{reservation.clientName}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">{reservation.propertyName}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{new Date(reservation.startDate).toLocaleDateString("fr-FR")}</div>
                                <div className="text-muted-foreground">
                                  au {new Date(reservation.endDate).toLocaleDateString("fr-FR")}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{getStatusBadge(reservation.status)}</td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div className="font-medium">{reservation.totalAmount} DT</div>
                                <div className="text-muted-foreground">{reservation.nightsBooked} nuits</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                {getPaymentBadge(paymentStatus)}
                                <div className="text-xs text-muted-foreground">
                                  {reservation.amountPaid} DT / {reservation.totalAmount} DT
                                  {remainingBalance > 0 && (
                                    <div className="text-red-600">Reste: {remainingBalance} DT</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewDetails(reservation)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditReservation(reservation)}>
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
                                      <AlertDialogTitle>Supprimer la réservation</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est
                                        irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteReservation(reservation.id)}
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
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedReservations.map((reservation) => {
                const paymentStatus = getPaymentStatus(reservation)
                const remainingBalance = reservation.totalAmount - reservation.amountPaid

                return (
                  <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{reservation.clientName}</CardTitle>
                          <CardDescription className="mt-1">{reservation.propertyName}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(reservation)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditReservation(reservation)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Dates</span>
                          <div className="text-sm text-right">
                            <div>{new Date(reservation.startDate).toLocaleDateString("fr-FR")}</div>
                            <div className="text-muted-foreground">
                              au {new Date(reservation.endDate).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Statut</span>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Montant</span>
                          <div className="text-sm text-right">
                            <div className="font-medium">{reservation.totalAmount} DT</div>
                            <div className="text-muted-foreground">{reservation.nightsBooked} nuits</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Paiement</span>
                          <div className="text-right">
                            {getPaymentBadge(paymentStatus)}
                            <div className="text-xs text-muted-foreground mt-1">
                              {reservation.amountPaid} / {reservation.totalAmount} DT
                            </div>
                            {remainingBalance > 0 && (
                              <div className="text-xs text-red-600">Reste: {remainingBalance} DT</div>
                            )}
                          </div>
                        </div>
                        {reservation.note && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground line-clamp-2">{reservation.note}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Reservation Modal */}
      <Dialog open={isAddEditModalOpen} onOpenChange={setIsAddEditModalOpen}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>{editingReservation ? "Modifier la réservation" : "Nouvelle réservation"}</DialogTitle>
            <DialogDescription>
              {editingReservation
                ? "Modifiez les informations de la réservation ci-dessous."
                : "Créez une nouvelle réservation pour vos propriétés."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Nom du client *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Ex: Sarah Mansouri"
              />
            </div>
            <div>
              <Label htmlFor="propertyId">Propriété *</Label>
              <Select
                value={formData.propertyId}
                onValueChange={(value) => setFormData({ ...formData, propertyId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une propriété" />
                </SelectTrigger>
                <SelectContent>
                  {mockProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Date d'arrivée *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Date de départ *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="totalAmount">Montant total (DT) *</Label>
              <Input
                id="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                placeholder="Ex: 750"
              />
            </div>
            <div>
              <Label htmlFor="amountPaid">Montant payé (DT)</Label>
              <Input
                id="amountPaid"
                type="number"
                value={formData.amountPaid}
                onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                placeholder="Ex: 300"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="note">Note (optionnelle)</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Informations supplémentaires sur cette réservation..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEditModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveReservation}>
              {editingReservation ? "Mettre à jour" : "Créer la réservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reservation Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>Informations complètes et suivi des paiements</DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Client</Label>
                  <p className="text-lg font-medium">{selectedReservation.clientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedReservation.clientPhone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Propriété</Label>
                  <p className="text-lg">{selectedReservation.propertyName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Dates de séjour</Label>
                  <p className="text-lg">
                    Du {new Date(selectedReservation.startDate).toLocaleDateString("fr-FR")} au{" "}
                    {new Date(selectedReservation.endDate).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedReservation.nightsBooked} nuits</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Statut</Label>
                  <div className="mt-1">{getStatusBadge(selectedReservation.status)}</div>
                </div>
              </div>

              {/* Payment Tracking Section */}
              <div className="border rounded-lg p-4 bg-muted/20">
                <h4 className="font-medium mb-3 flex items-center">
                  <Euro className="w-4 h-4 mr-2" />
                  Suivi des paiements
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Montant total</Label>
                    <p className="text-lg font-semibold">{selectedReservation.totalAmount} DT</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Montant payé</Label>
                    <p className="text-lg font-semibold text-green-600">{selectedReservation.amountPaid} DT</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Solde restant</Label>
                    <p className="text-lg font-semibold text-red-600">
                      {selectedReservation.totalAmount - selectedReservation.amountPaid} DT
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Statut paiement</Label>
                    <div className="mt-1">{getPaymentBadge(getPaymentStatus(selectedReservation))}</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Nuits réservées: {selectedReservation.nightsBooked}</span>
                    <span>Nuits payées: {selectedReservation.nightsPaid}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${(selectedReservation.amountPaid / selectedReservation.totalAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {selectedReservation.note && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Note</Label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{selectedReservation.note}</p>
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
