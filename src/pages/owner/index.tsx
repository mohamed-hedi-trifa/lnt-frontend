"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
    Home,
    Eye,
    Star,
    Bell,
    Plus,
    CreditCard,
    MessageSquare,
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
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/owner/sidebar"

// Données simulées
const revenueData = [
    { month: "Jan", revenus: 2400, depenses: 400 },
    { month: "Fév", revenus: 1398, depenses: 300 },
    { month: "Mar", revenus: 9800, depenses: 500 },
    { month: "Avr", revenus: 3908, depenses: 400 },
    { month: "Mai", revenus: 4800, depenses: 600 },
    { month: "Jun", revenus: 3800, depenses: 400 },
]

const propertyRevenueData = [
    { name: "Villa Sidi Bou Said", revenus: 12500, nuits: 25 },
    { name: "Appartement Tunis Centre", revenus: 8900, nuits: 18 },
    { name: "Maison La Marsa", revenus: 6700, nuits: 12 },
]

const expenseData = [
    { name: "Abonnement Premium", value: 299, color: "#ea580c" },
    { name: "Frais de service", value: 150, color: "#f97316" },
    { name: "Promotion annonces", value: 200, color: "#fb923c" },
]

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)



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
                                <h1 className="text-2xl font-serif font-bold text-foreground">Tableau de bord</h1>
                                <p className="text-muted-foreground">Bienvenue, Ahmed Benali</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <Bell className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Notifications</span>
                            </Button>
                            <Button size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Nouvelle annonce</span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-4 lg:p-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Annonces actives</CardTitle>
                                <Home className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3</div>
                                <p className="text-xs text-muted-foreground">+1 ce mois</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Vues aujourd'hui</CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">127</div>
                                <p className="text-xs text-green-600">+12% vs hier</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Nouveaux avis</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">Note moyenne: 4.8/5</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenus ce mois</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">3,800 DT</div>
                                <p className="text-xs text-green-600">+15% vs mois dernier</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section Caisse */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Revenus vs Dépenses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Wallet className="w-5 h-5 text-primary" />
                                    <span>Flux financiers</span>
                                </CardTitle>
                                <CardDescription>Revenus et dépenses des 6 derniers mois</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip formatter={(value: any) => [`${value} DT`, ""]} />
                                        <Bar dataKey="revenus" fill="#ea580c" name="Revenus" />
                                        <Bar dataKey="depenses" fill="#f97316" name="Dépenses" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Solde et résumé */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Résumé financier</CardTitle>
                                <CardDescription>Situation actuelle de votre caisse</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-green-700">Revenus totaux</p>
                                        <p className="text-2xl font-bold text-green-800">28,100 DT</p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-green-600" />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-red-700">Dépenses totales</p>
                                        <p className="text-2xl font-bold text-red-800">3,200 DT</p>
                                    </div>
                                    <TrendingDown className="w-8 h-8 text-red-600" />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                                    <div>
                                        <p className="text-sm text-primary">Solde net</p>
                                        <p className="text-3xl font-bold text-primary">24,900 DT</p>
                                    </div>
                                    <Wallet className="w-8 h-8 text-primary" />
                                </div>

                                <Button className="w-full" asChild>
                                    <Link href="/dashboard/caisse">Voir tous les mouvements</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Revenus par logement et Répartition des dépenses */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenus par logement</CardTitle>
                                <CardDescription>Performance de vos annonces ce mois</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {propertyRevenueData.map((property, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-sm">{property.name}</p>
                                                <p className="text-xs text-muted-foreground">{property.nuits} nuits louées</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">{property.revenus} DT</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {Math.round(property.revenus / property.nuits)} DT/nuit
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Répartition des dépenses</CardTitle>
                                <CardDescription>Vos coûts ce mois</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={expenseData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {expenseData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value} DT`, ""]} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-4 space-y-2">
                                    {expenseData.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-sm">{item.name}</span>
                                            </div>
                                            <span className="text-sm font-medium">{item.value} DT</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Notifications importantes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Bell className="w-5 h-5 text-primary" />
                                <span>Notifications importantes</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                                    <div>
                                        <p className="text-sm font-medium text-green-800">Annonce validée</p>
                                        <p className="text-xs text-green-600">
                                            Votre "Villa Sidi Bou Said" a été approuvée et est maintenant visible
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        Nouveau
                                    </Badge>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                                    <div>
                                        <p className="text-sm font-medium text-orange-800">Abonnement expire bientôt</p>
                                        <p className="text-xs text-orange-600">Votre abonnement Premium expire dans 5 jours</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                        Renouveler
                                    </Button>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-800">Nouveau message</p>
                                        <p className="text-xs text-blue-600">Un visiteur vous a contacté pour "Appartement Tunis Centre"</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                        <MessageSquare className="w-3 h-3 mr-1" />
                                        Répondre
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
