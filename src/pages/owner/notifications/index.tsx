"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
    Eye,
    Star,
    Bell,
    Menu,
    CalendarDays,
    Search,
    Trash2,
    Check,
    CheckCheck,
    AlertTriangle,
    Heart,
    DollarSign,
    Clock,
    Filter,
} from "lucide-react"
import Sidebar from "@/components/owner/sidebar"

// Données simulées des notifications
const mockNotifications = [
    {
        id: 1,
        type: "reservation",
        icon: CalendarDays,
        title: "Nouvelle réservation reçue",
        description: "Villa Sidi Bou Said - 3 nuits du 15 au 18 décembre",
        timestamp: "Aujourd'hui à 14h32",
        isRead: false,
        priority: "high",
    },
    {
        id: 2,
        type: "payment",
        icon: DollarSign,
        title: "Paiement complet enregistré",
        description: "Réservation #1234 - 450 DT reçus",
        timestamp: "Aujourd'hui à 11h15",
        isRead: false,
        priority: "normal",
    },
    {
        id: 3,
        type: "review",
        icon: Star,
        title: "Nouvel avis client publié",
        description: "Appartement Tunis Centre - 5 étoiles",
        timestamp: "Hier à 16h45",
        isRead: true,
        priority: "normal",
    },
    {
        id: 4,
        type: "favorite",
        icon: Heart,
        title: "Ajout aux favoris",
        description: "Votre Maison La Marsa a été ajoutée aux favoris",
        timestamp: "Hier à 09h20",
        isRead: true,
        priority: "low",
    },
    {
        id: 5,
        type: "expiry",
        icon: AlertTriangle,
        title: "Annonce expire bientôt",
        description: "Villa Sidi Bou Said expire dans 3 jours",
        timestamp: "Il y a 2 jours",
        isRead: false,
        priority: "high",
    },
    {
        id: 6,
        type: "view",
        icon: Eye,
        title: "Pic de vues détecté",
        description: "Appartement Tunis Centre - 25 vues aujourd'hui",
        timestamp: "Il y a 3 jours",
        isRead: true,
        priority: "low",
    },
]

export default function NotificationsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [notifications, setNotifications] = useState(mockNotifications)
    const [filter, setFilter] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const { toast } = useToast()



    const unreadCount = notifications.filter((n) => !n.isRead).length

    const filteredNotifications = notifications.filter((notification) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "unread" && !notification.isRead) ||
            (filter === "important" && notification.priority === "high")

        const matchesSearch =
            searchQuery === "" ||
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.description.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFilter && matchesSearch
    })

    const markAsRead = (id: number) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
        toast({
            description: "Notification marquée comme lue",
        })
    }

    const markAsUnread = (id: number) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)))
        toast({
            description: "Notification marquée comme non lue",
        })
    }

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
        toast({
            description: "Notification supprimée",
            variant: "destructive",
        })
    }

    const getNotificationColor = (type: string, priority: string) => {
        if (priority === "high") return "border-l-red-500 bg-red-50"
        if (type === "payment") return "border-l-green-500 bg-green-50"
        if (type === "review") return "border-l-yellow-500 bg-yellow-50"
        return "border-l-blue-500 bg-blue-50"
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
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-2xl font-serif font-bold text-foreground">Notifications</h1>
                                    {unreadCount > 0 && (
                                        <Badge variant="destructive" className="text-xs">
                                            {unreadCount} non lues
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-muted-foreground">Suivez l'activité de vos annonces en temps réel</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-4 lg:p-6 space-y-6">
                    {/* Info Box */}
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-900">
                                        Les notifications vous aident à suivre l'activité de vos annonces en temps réel.
                                    </p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Restez informé des réservations, paiements, avis et autres événements importants.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filters and Search */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Rechercher dans les notifications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes</SelectItem>
                                <SelectItem value="unread">Non lues</SelectItem>
                                <SelectItem value="important">Importantes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-3">
                        {filteredNotifications.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-muted-foreground mb-2">Aucune notification trouvée</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {searchQuery || filter !== "all"
                                            ? "Essayez de modifier vos filtres ou votre recherche."
                                            : "Vous n'avez pas encore de notifications."}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredNotifications.map((notification) => {
                                const IconComponent = notification.icon
                                return (
                                    <Card
                                        key={notification.id}
                                        className={`border-l-4 transition-all hover:shadow-md ${!notification.isRead ? "bg-muted/50" : ""
                                            } ${getNotificationColor(notification.type, notification.priority)}`}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-3 flex-1">
                                                    <div className="p-2 rounded-full bg-white/80">
                                                        <IconComponent className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h3 className={`text-sm font-medium ${!notification.isRead ? "font-bold" : ""}`}>
                                                                {notification.title}
                                                            </h3>
                                                            {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                                                            {notification.priority === "high" && (
                                                                <Badge variant="destructive" className="text-xs">
                                                                    Important
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                                                        <div className="flex items-center space-x-2">
                                                            <Clock className="w-3 h-3 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center space-x-1 ml-4">
                                                    {notification.isRead ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => markAsUnread(notification.id)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <CheckCheck className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        )}
                    </div>

                    {/* Summary Stats */}
                    {filteredNotifications.length > 0 && (
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>
                                        {filteredNotifications.length} notification{filteredNotifications.length > 1 ? "s" : ""} affichée
                                        {filteredNotifications.length > 1 ? "s" : ""}
                                    </span>
                                    <span>
                                        {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}
