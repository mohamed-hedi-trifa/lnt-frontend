"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Building,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Données simulées
const kpiData = {
  totalAnnonces: 1247,
  annoncesActives: 892,
  annoncesNonPayees: 45,
  annoncesExpirant: 23,
  proprietairesActifs: 324,
  revenuMensuel: 44650,
}

const chartData = {
  evolution: [
    { semaine: "S1", annonces: 120 },
    { semaine: "S2", annonces: 145 },
    { semaine: "S3", annonces: 167 },
    { semaine: "S4", annonces: 189 },
    { semaine: "S5", annonces: 203 },
    { semaine: "S6", annonces: 225 },
    { semaine: "S7", annonces: 248 },
    { semaine: "S8", annonces: 267 },
  ],
  gouvernorats: [
    { nom: "Tunis", annonces: 342 },
    { nom: "Sousse", annonces: 198 },
    { nom: "Sfax", annonces: 156 },
    { nom: "Monastir", annonces: 134 },
    { nom: "Nabeul", annonces: 112 },
    { nom: "Autres", annonces: 305 },
  ],
  statuts: [
    { nom: "Actives", value: 892, color: "#3b82f6" },
    { nom: "Expirées", value: 267, color: "#6b7280" },
    { nom: "Non payées", value: 45, color: "#dc2626" },
    { nom: "En attente", value: 43, color: "#f59e0b" },
  ],
}

const alertes = [
  { id: 1, type: "expiration", titre: "Villa Sidi Bou Said", proprietaire: "Ahmed Ben Ali", jours: 3 },
  { id: 2, type: "paiement", titre: "Appartement Sousse Centre", proprietaire: "Fatma Trabelsi", montant: 50 },
  { id: 3, type: "validation", titre: "Nouveau propriétaire", proprietaire: "Mohamed Gharbi", date: "2024-01-15" },
  { id: 4, type: "expiration", titre: "Studio Hammamet", proprietaire: "Leila Mansouri", jours: 1 },
]

const sidebarItems = [
  { icon: Home, label: "Tableau de bord", href: "/admin", active: true },
  { icon: User, label: "Propriétaires", href: "/admin/proprietaires" },
  { icon: MapPin, label: "Annonces", href: "/admin/annonces" },
  { icon: Calendar, label: "Réservations", href: "/admin/reservations" },
  { icon: CreditCard, label: "Paiements & Abonnements", href: "/admin/paiements" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: HelpCircle, label: "Support & Tickets", href: "/admin/support" },
  { icon: Settings, label: "Paramètres", href: "/admin/parametres" },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [refreshTime, setRefreshTime] = useState(new Date())

  // Rafraîchissement automatique toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        setRefreshTime(new Date())
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

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
                <h1 className="text-2xl font-bold text-foreground">Tableau de bord administrateur</h1>
                <p className="text-sm text-muted-foreground">
                  Dernière mise à jour: {refreshTime.toLocaleTimeString("fr-FR")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Admin Principal</p>
                <p className="text-xs text-muted-foreground">Administrateur</p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Profil
              </Button>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="p-6 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Annonces</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.totalAnnonces.toLocaleString("fr-FR")}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annonces Actives</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {kpiData.annoncesActives.toLocaleString("fr-FR")}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((kpiData.annoncesActives / kpiData.totalAnnonces) * 100)}% du total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non Payées</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{kpiData.annoncesNonPayees}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                  -8% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expirant Bientôt</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{kpiData.annoncesExpirant}</div>
                <p className="text-xs text-muted-foreground">Dans les 7 jours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Propriétaires Actifs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.proprietairesActifs}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +5% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenu Mensuel</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {kpiData.revenuMensuel.toLocaleString("fr-FR")} DT
                </div>
                <p className="text-xs text-muted-foreground">50 DT × annonces payées</p>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Évolution des annonces */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Évolution des annonces par semaine</CardTitle>
                <CardDescription>Nombre total d'annonces publiées</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.evolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semaine" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="annonces"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Statut des annonces */}
            <Card>
              <CardHeader>
                <CardTitle>Statut des annonces</CardTitle>
                <CardDescription>Répartition par statut</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.statuts}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.statuts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Répartition par gouvernorat */}
            <Card className="xl:col-span-3">
              <CardHeader>
                <CardTitle>Répartition des annonces par gouvernorat</CardTitle>
                <CardDescription>Nombre d'annonces par région</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.gouvernorats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nom" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="annonces" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alertes et Accès rapide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section alertes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                  Alertes importantes
                </CardTitle>
                <CardDescription>Actions requises</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alertes.map((alerte) => (
                  <div key={alerte.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {alerte.type === "expiration" && <Clock className="h-4 w-4 text-orange-500" />}
                        {alerte.type === "paiement" && <CreditCard className="h-4 w-4 text-destructive" />}
                        {alerte.type === "validation" && <User className="h-4 w-4 text-primary" />}
                        <span className="font-medium text-sm">{alerte.titre}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alerte.proprietaire}
                        {alerte.jours && ` • Expire dans ${alerte.jours} jour${alerte.jours > 1 ? "s" : ""}`}
                        {alerte.montant && ` • ${alerte.montant} DT à payer`}
                        {alerte.date && ` • Inscrit le ${alerte.date}`}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      {alerte.type === "expiration" && "Contacter"}
                      {alerte.type === "paiement" && "Relancer"}
                      {alerte.type === "validation" && "Valider"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Accès rapide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Accès rapide
                </CardTitle>
                <CardDescription>Actions fréquentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Gérer les propriétaires
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Gérer les annonces
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Centre de support
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres de l'application
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
