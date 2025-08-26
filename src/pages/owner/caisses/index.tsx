"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
    TrendingUp,
    TrendingDown,
    MapPin,
    Menu,
    X,
    Users,
    CalendarDays,
    Search,
    Edit,
    Trash2,
    Download,
    CalendarIcon,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Sidebar from "@/components/owner/sidebar"

// Données simulées
const kpiData = {
    soldeActuel: 24900,
    revenusMonth: 3800,
    depensesMonth: 650,
    logementsActifs: 3,
    tendanceRevenus: 15,
    tendanceDepenses: -8,
}

const transactions = [
    {
        id: 1,
        date: "2024-01-15",
        type: "Revenu",
        description: "Réservation Villa Sidi Bou Said - 5 nuits",
        montant: 1250,
        statut: "Payé",
        logement: "Villa Sidi Bou Said",
        categorie: "Réservation",
        note: "",
        manuel: false,
    },
    {
        id: 2,
        date: "2024-01-12",
        type: "Dépense",
        description: "Facture STEG - Électricité",
        montant: -85,
        statut: "Payé",
        logement: "Appartement Tunis Centre",
        categorie: "Facture STEG",
        note: "Facture mensuelle",
        manuel: true,
    },
    {
        id: 3,
        date: "2024-01-10",
        type: "Revenu",
        description: "Réservation Appartement Tunis Centre - 3 nuits",
        montant: 450,
        statut: "Partiel",
        logement: "Appartement Tunis Centre",
        categorie: "Réservation",
        note: "",
        manuel: false,
    },
    {
        id: 4,
        date: "2024-01-08",
        type: "Dépense",
        description: "Produits de nettoyage",
        montant: -45,
        statut: "Payé",
        logement: "Villa Sidi Bou Said",
        categorie: "Produits ménagers",
        note: "Nettoyage après départ client",
        manuel: true,
    },
    {
        id: 5,
        date: "2024-01-05",
        type: "Dépense",
        description: "Abonnement Premium LNT",
        montant: -299,
        statut: "Payé",
        logement: "",
        categorie: "Abonnement",
        note: "",
        manuel: false,
    },
]

export default function CaissePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("Revenu") // Updated default value
    const [filterLogement, setFilterLogement] = useState("all")
    const [filterStatut, setFilterStatut] = useState("all")
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [newTransaction, setNewTransaction] = useState({
        type: "Revenu",
        categorie: "",
        montant: "",
        date: new Date(),
        description: "",
        logement: "",
        note: "",
    })



    const categories = {
        Revenu: ["Réservation", "Paiement direct", "Autre"],
        Dépense: ["Facture STEG", "Produits ménagers", "Maintenance", "Abonnement", "Autre"],
    }

    const logements = ["Villa Sidi Bou Said", "Appartement Tunis Centre", "Maison La Marsa"]

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterType === "all" || transaction.type === filterType
        const matchesLogement = filterLogement === "all" || transaction.logement === filterLogement
        const matchesStatut = filterStatut === "all" || transaction.statut === filterStatut
        return matchesSearch && matchesType && matchesLogement && matchesStatut
    })

    const handleAddTransaction = () => {
        const transaction = {
            id: Date.now(),
            ...newTransaction,
            montant:
                newTransaction.type === "Dépense" ? -Math.abs(Number(newTransaction.montant)) : Number(newTransaction.montant),
            date: format(newTransaction.date, "yyyy-MM-dd"),
            statut: "Payé",
            manuel: true,
        }

        toast({
            title: "Mouvement ajouté",
            description: `${transaction.type} de ${Math.abs(transaction.montant)} DT ajouté avec succès.`,
        })

        setIsAddModalOpen(false)
        setNewTransaction({
            type: "Revenu",
            categorie: "",
            montant: "",
            date: new Date(),
            description: "",
            logement: "",
            note: "",
        })
    }

    const handleEditTransaction = () => {
        toast({
            title: "Mouvement modifié",
            description: "Les modifications ont été enregistrées avec succès.",
        })
        setIsEditModalOpen(false)
    }

    const handleDeleteTransaction = (id: number) => {
        toast({
            title: "Mouvement supprimé",
            description: "Le mouvement a été supprimé avec succès.",
            variant: "destructive",
        })
    }

    const getStatusColor = (statut: string) => {
        switch (statut) {
            case "Payé":
                return "bg-green-100 text-green-800"
            case "Partiel":
                return "bg-orange-100 text-orange-800"
            case "En attente":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
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
                                <h1 className="text-2xl font-serif font-bold text-foreground">Caisse</h1>
                                <p className="text-muted-foreground">Gestion financière de vos locations</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Exporter</span>
                            </Button>
                            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        <span className="hidden sm:inline">Ajouter mouvement</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Ajouter un mouvement</DialogTitle>
                                        <DialogDescription>Enregistrez un nouveau revenu ou une nouvelle dépense.</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Type</Label>
                                            <Tabs
                                                value={newTransaction.type}
                                                onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value, categorie: "" })}
                                            >
                                                <TabsList className="grid w-full grid-cols-2">
                                                    <TabsTrigger value="Revenu" className="text-green-700">
                                                        💰 Revenu
                                                    </TabsTrigger>
                                                    <TabsTrigger value="Dépense" className="text-red-700">
                                                        📉 Dépense
                                                    </TabsTrigger>
                                                </TabsList>
                                            </Tabs>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Catégorie</Label>
                                            <Select
                                                value={newTransaction.categorie}
                                                onValueChange={(value) => setNewTransaction({ ...newTransaction, categorie: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {(categories['Revenu'] || []).map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Montant (DT)</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    value={newTransaction.montant}
                                                    onChange={(e) => setNewTransaction({ ...newTransaction, montant: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-start text-left font-normal bg-transparent"
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {format(newTransaction.date, "dd/MM/yyyy", { locale: fr })}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={newTransaction.date}
                                                            onSelect={(date) => setNewTransaction({ ...newTransaction, date: date || new Date() })}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Input
                                                placeholder="Description du mouvement"
                                                value={newTransaction.description}
                                                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Logement associé (optionnel)</Label>
                                            <Select
                                                value={newTransaction.logement}
                                                onValueChange={(value) =>
                                                    setNewTransaction({ ...newTransaction, logement: value === "none" ? "" : value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un logement" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Aucun logement</SelectItem>
                                                    {logements.map((logement) => (
                                                        <SelectItem key={logement} value={logement}>
                                                            {logement}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Note (optionnelle)</Label>
                                            <Textarea
                                                placeholder="Ajouter une note..."
                                                value={newTransaction.note}
                                                onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                            Annuler
                                        </Button>
                                        <Button
                                            onClick={handleAddTransaction}
                                            disabled={!newTransaction.categorie || !newTransaction.montant || !newTransaction.description}
                                        >
                                            Enregistrer
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-4 lg:p-6 space-y-6">
                    {/* KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">💰 Solde actuel</CardTitle>
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{kpiData.soldeActuel.toLocaleString()} DT</div>
                                <p className="text-xs text-muted-foreground">Revenus - Dépenses</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">📈 Revenus ce mois</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{kpiData.revenusMonth.toLocaleString()} DT</div>
                                <p className="text-xs text-green-600 flex items-center">
                                    <ArrowUpRight className="w-3 h-3 mr-1" />+{kpiData.tendanceRevenus}% vs mois dernier
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">📉 Dépenses ce mois</CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{kpiData.depensesMonth.toLocaleString()} DT</div>
                                <p className="text-xs text-green-600 flex items-center">
                                    <ArrowDownRight className="w-3 h-3 mr-1" />
                                    {kpiData.tendanceDepenses}% vs mois dernier
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">🏠 Logements actifs</CardTitle>
                                <Home className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{kpiData.logementsActifs}</div>
                                <p className="text-xs text-muted-foreground">Annonces publiées</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Historique des mouvements */}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                <div>
                                    <CardTitle>Historique des mouvements</CardTitle>
                                    <CardDescription>Tous vos revenus et dépenses</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            placeholder="Rechercher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 w-full sm:w-64"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Select value={filterType} onValueChange={setFilterType}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Tous types</SelectItem>
                                                <SelectItem value="Revenu">Revenus</SelectItem>
                                                <SelectItem value="Dépense">Dépenses</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select value={filterStatut} onValueChange={setFilterStatut}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Tous statuts</SelectItem>
                                                <SelectItem value="Payé">Payé</SelectItem>
                                                <SelectItem value="Partiel">Partiel</SelectItem>
                                                <SelectItem value="En attente">En attente</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Desktop Table */}
                            <div className="hidden md:block">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-2">Date</th>
                                                <th className="text-left py-3 px-2">Type</th>
                                                <th className="text-left py-3 px-2">Description</th>
                                                <th className="text-right py-3 px-2">Montant</th>
                                                <th className="text-center py-3 px-2">Statut</th>
                                                <th className="text-center py-3 px-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTransactions.map((transaction) => (
                                                <tr key={transaction.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3 px-2 text-sm">
                                                        {format(new Date(transaction.date), "dd/MM/yyyy", { locale: fr })}
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <div className="flex items-center space-x-2">
                                                            {transaction.type === "Revenu" ? (
                                                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                                                            ) : (
                                                                <ArrowDownRight className="w-4 h-4 text-red-600" />
                                                            )}
                                                            <span
                                                                className={`text-sm font-medium ${transaction.type === "Revenu" ? "text-green-700" : "text-red-700"}`}
                                                            >
                                                                {transaction.type}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <div>
                                                            <p className="text-sm font-medium">{transaction.description}</p>
                                                            {transaction.logement && (
                                                                <p className="text-xs text-muted-foreground">{transaction.logement}</p>
                                                            )}
                                                            {transaction.manuel && (
                                                                <Badge variant="outline" className="text-xs mt-1">
                                                                    Ajout manuel
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span
                                                            className={`font-bold ${transaction.montant > 0 ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {transaction.montant > 0 ? "+" : ""}
                                                            {transaction.montant.toLocaleString()} DT
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-center">
                                                        <Badge className={getStatusColor(transaction.statut)}>{transaction.statut}</Badge>
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <div className="flex items-center justify-center space-x-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setSelectedTransaction(transaction)
                                                                    setIsDetailsModalOpen(true)
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setSelectedTransaction(transaction)
                                                                    setIsEditModalOpen(true)
                                                                }}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="ghost" size="sm">
                                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Supprimer le mouvement</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Êtes-vous sûr de vouloir supprimer ce mouvement ? Cette action est irréversible.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                                                            className="bg-red-600 hover:bg-red-700"
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
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden space-y-4">
                                {filteredTransactions.map((transaction) => (
                                    <Card key={transaction.id} className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-2">
                                                {transaction.type === "Revenu" ? (
                                                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                                                )}
                                                <span
                                                    className={`text-sm font-medium ${transaction.type === "Revenu" ? "text-green-700" : "text-red-700"}`}
                                                >
                                                    {transaction.type}
                                                </span>
                                            </div>
                                            <Badge className={getStatusColor(transaction.statut)}>{transaction.statut}</Badge>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="font-medium">{transaction.description}</p>
                                            {transaction.logement && <p className="text-sm text-muted-foreground">{transaction.logement}</p>}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    {format(new Date(transaction.date), "dd/MM/yyyy", { locale: fr })}
                                                </span>
                                                <span className={`font-bold ${transaction.montant > 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {transaction.montant > 0 ? "+" : ""}
                                                    {transaction.montant.toLocaleString()} DT
                                                </span>
                                            </div>
                                            {transaction.manuel && (
                                                <Badge variant="outline" className="text-xs">
                                                    Ajout manuel
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedTransaction(transaction)
                                                    setIsDetailsModalOpen(true)
                                                }}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedTransaction(transaction)
                                                    setIsEditModalOpen(true)
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Supprimer le mouvement</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Êtes-vous sûr de vouloir supprimer ce mouvement ? Cette action est irréversible.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Supprimer
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {filteredTransactions.length === 0 && (
                                <div className="text-center py-8">
                                    <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Aucun mouvement trouvé</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Details Modal */}
            <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Détails du mouvement</DialogTitle>
                    </DialogHeader>
                    {selectedTransaction && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                                    <div className="flex items-center space-x-2 mt-1">
                                        {selectedTransaction.type === "Revenu" ? (
                                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                                        )}
                                        <span
                                            className={`font-medium ${selectedTransaction.type === "Revenu" ? "text-green-700" : "text-red-700"}`}
                                        >
                                            {selectedTransaction.type}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Montant</Label>
                                    <p
                                        className={`font-bold text-lg mt-1 ${selectedTransaction.montant > 0 ? "text-green-600" : "text-red-600"}`}
                                    >
                                        {selectedTransaction.montant > 0 ? "+" : ""}
                                        {selectedTransaction.montant.toLocaleString()} DT
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                                <p className="mt-1">{selectedTransaction.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                                    <p className="mt-1">{format(new Date(selectedTransaction.date), "dd/MM/yyyy", { locale: fr })}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Statut</Label>
                                    <Badge className={`${getStatusColor(selectedTransaction.statut)} mt-1`}>
                                        {selectedTransaction.statut}
                                    </Badge>
                                </div>
                            </div>

                            {selectedTransaction.logement && (
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Logement</Label>
                                    <p className="mt-1">{selectedTransaction.logement}</p>
                                </div>
                            )}

                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Catégorie</Label>
                                <p className="mt-1">{selectedTransaction.categorie}</p>
                            </div>

                            {selectedTransaction.note && (
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Note</Label>
                                    <p className="mt-1 text-sm bg-muted p-3 rounded-lg">{selectedTransaction.note}</p>
                                </div>
                            )}

                            {selectedTransaction.manuel && <Badge variant="outline">Ajout manuel</Badge>}
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
