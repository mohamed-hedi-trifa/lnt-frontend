"use client"

import React, { use } from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
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
import AdminSidebar from "@/components/admin/AdminSidebar"
import ProprietairesLoading from "./ProprietairesLoading";

interface Statistique {
  totalUsers: number;
  totalProprietaires: number;
  proprietairesActifs: number;
  totalAnnonces: number;
}

interface User {
  id: number,
  firstname: string,
  lastname: string,
  phone?: string,
  email: string,
  role: string,
  is_verified: string,
  is_active: string
}


export default function UsersAdmin() {
  const [proprietairesLoading, setProprietairesLoading] = useState(true);
  const [stat, setStat] = useState<Statistique>({
    totalUsers: 0,
    totalProprietaires: 0,
    proprietairesActifs: 0,
    totalAnnonces: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [annoncesFilter, setAnnoncesFilter] = useState("tous")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingUser, setEditingUser] = useState<User>(
    {
      id: 0,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: "",
      is_verified: "",
      is_active: ""
    }
  )
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {


    fetchData();
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, annoncesFilter, currentPage]);

  const fetchData = async () => {
    const response = await axios.get("/api/users", {
      params: {
        search: searchTerm,
        is_active: statusFilter,
        role: typeFilter,
        annonces: annoncesFilter,
        page: currentPage,
        per_page: 10,
      },
    });

    setStat({
      totalUsers: response.data.stats.totalUsers,
      totalProprietaires: response.data.stats.total_owners,
      proprietairesActifs: response.data.stats.active_owners,
      totalAnnonces: response.data.stats.totalAnnonces,
    });

    setFilteredUsers(response.data.data);
    setProprietairesLoading(false);
  };
  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.data || [];



  // Fonction pour ouvrir le modal d'édition
  const handleEdit = (user) => {
    setEditingUser({ ...user })
    setIsEditModalOpen(true)
  }

  // Fonction pour sauvegarder les modifications
  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/users/${editingUser.id}`, editingUser)

      fetchData();

      setIsEditModalOpen(false)
      setEditingUser(null)

      toast({
        title: "Utilisateur modifié",
        description: "Les informations ont été mises à jour avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error)

      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'utilisateur.",
        variant: "destructive",
      })
    }
  }

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (statut) => {
    switch (statut) {
      case 1:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
      case 0:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactif</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  // Fonction pour obtenir le badge de type
  const getTypeBadge = (type) => {
    switch (type) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Admin
          </Badge>
        )
      case "owner":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Owner
          </Badge>
        )
      case "visitor":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Visitor
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inconnu
          </Badge>
        )
    }
  }


  return (
    <div className="flex">
      <AdminSidebar sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen} />


      <div className="min-h-screen bg-background w-svw">
        {/* Sidebar */}


        {/* Contenu principal */}
        <div className="">
          {/* Header */}
          <header className="bg-card border-b border-border p-4 shadow z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-m font-bold text-foreground">Gestion des utilisateurs</h1>

                </div>
              </div>
            </div>
          </header>

          {/* Contenu */}
          <main className="p-6 space-y-6 backgroundColor-lightBlue bg-[#f8fafc]  h-[calc(100vh-57px)]">
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Users className="h-10 w-10 text-primary" />

                    <div>
                      <p className="text-2xl font-bold">{stat.totalUsers}10</p>
                      <p className="text-sm text-muted-foreground">Nombre total d'utilisateurs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Building className="h-10 w-10 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {stat.totalProprietaires}
                      </p>
                      <p className="text-sm text-muted-foreground">Total utilisateurs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <User className="h-10 w-10 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {stat.proprietairesActifs}
                      </p>
                      <p className="text-sm text-muted-foreground">Actifs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-10 w-10 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {stat.totalAnnonces}1200
                      </p>
                      <p className="text-sm text-muted-foreground">Total annonces</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* Tableau des utilisateurs */}
            <Card className="pb-0 h-[650px]">
              <CardHeader>
                <div className="flex justify-between items-center ">

                  <div className="flex flex-col gap-2 ">
                    <CardTitle>Liste des utilisateurs</CardTitle>
                    <CardDescription>
                      Affichage de {startIndex + 1} à {endIndex > filteredUsers.length ? filteredUsers.length : endIndex} sur{" "}
                      {filteredUsers.length} utilisateurs
                    </CardDescription>
                  </div>



                  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 "> */}
                  <div className="flex  gap-4 ">
                    {/* Barre de recherche */}
                    <div className="lg:col-span-2">

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
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les statuts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="1">Actif</SelectItem>
                          <SelectItem value="0">Inactif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Filtre par type */}
                    <div>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="visitor">Visiteur</SelectItem>
                          <SelectItem value="owner">Propriétaire</SelectItem>
                          <SelectItem value="admin">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Filtre par nombre d'annonces */}
                    <div>
                      <Select value={annoncesFilter} onValueChange={setAnnoncesFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tous">Annonces</SelectItem>
                          <SelectItem value="aucune">Aucune (0)</SelectItem>
                          <SelectItem value="1-5">1 à 5</SelectItem>
                          <SelectItem value="6+">6 ou plus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <div className="-mx-12 w-auto h-[1px] bg-[#dddedf] "></div>

              <CardContent>
                {/* Vue desktop - Tableau */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom complet</TableHead>
                        <TableHead>email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Annonces</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((user: User) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                          
                              <p className="text-sm text-muted-foreground">{user.firstname + " " + user.lastname}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                            
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Phone className="h-3 w-3 mr-1" />
                                {user.phone}
                              </div>
                              {/* <div className="flex items-center text-sm">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              {user.whatsapp}
                            </div> */}
                            </div>
                          </TableCell>
                          <TableCell>{getTypeBadge(user.role)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">0</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.is_active)}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
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
                  {currentUsers.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">{user.nom}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex space-x-2">
                            {getStatusBadge(user.is_active)}
                            {getTypeBadge(user.type)}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2" />
                            {user.telephone}
                          </div>
                          <div className="flex items-center text-sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {user.whatsapp}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            {user.annonces} annonce{user.annonces > 1 ? "s" : ""}
                          </div>
                        </div>

                        <Button size="sm" variant="outline" onClick={() => handleEdit(user)} className="w-full">
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* <div className="-mx-12 w-auto h-[1px] bg-[#b1b3b6] mt-5"></div> */}


                {/* Pagination */}
                {totalPages > 1 && (

                  <div className="flex items-center justify-between m-3 border-t-2 pt-2">
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
              <DialogTitle>Modifier l'utilisateur</DialogTitle>
              <DialogDescription>
                Modifiez les informations du utilisateur. Cliquez sur "Sauvegarder" pour enregistrer les changements.
              </DialogDescription>
            </DialogHeader>

            {editingUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-prenom" className="text-right">
                    Prénom
                  </Label>
                  <Input
                    id="edit-prenom"
                    value={editingUser.firstname}
                    onChange={(e) => setEditingUser({ ...editingUser, firstname: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-nom" className="text-right">
                      Nom
                    </Label>
                    <Input
                      id="edit-nom"
                      value={editingUser.lastname}
                      onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-telephone" className="text-right">
                    Téléphone
                  </Label>
                  <Input
                    id="edit-telephone"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-whatsapp" className="text-right">
                  WhatsApp
                </Label>
                <Input
                  id="edit-whatsapp"
                  value={editingUser.whatsapp}
                  onChange={(e) => setEditingUser({ ...editingUser, whatsapp: e.target.value })}
                  className="col-span-3"
                />
              </div> */}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
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
                    value={editingUser.is_verified}
                    onValueChange={(value) => setEditingUser({ ...editingUser, is_verified: value })}
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


      </div >
    </div>
  )


}
