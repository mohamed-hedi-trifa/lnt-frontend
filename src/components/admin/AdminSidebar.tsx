"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Home,
    Users,
    MapPin,
    Bell,
    HelpCircle,
    Settings,
    LogOut,
    X,
    Building,
    BarChart3,
    FileText,
    Shield,
} from "lucide-react"

interface AdminSidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

    // const sidebarItems = [
    //     { icon: Home, label: "Tableau de bord", href: "/admin", active: true },
    //     { icon: User, label: "Propriétaires", href: "/admin/owners" },
    //     { icon: MapPin, label: "Annonces", href: "/admin/announcments" },
    //     { icon: Calendar, label: "Réservations", href: "/admin/reservations" },
    //     { icon: CreditCard, label: "Paiements & Abonnements", href: "/admin/paiements" },
    //     { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    //     { icon: HelpCircle, label: "Support & Tickets", href: "/admin/support" },
    //     { icon: Settings, label: "Paramètres", href: "/admin/parametres" },
    // ]
const navigationItems = [
    {
        name: "Tableau de bord",
        href: "/admin",
        icon: Home,
        current: false,
    },
    {
        name: "Utilisateurs",
        href: "/admin/users",
        icon: Users,
        current: true,
    },
    {
        name: "Propriétaires",
        href: "/admin/proprietaires",
        icon: Building,
        current: false,
    },
    {
        name: "Annonces",
        href: "/admin/annonces",
        icon: MapPin,
        current: false,
    },
    {
        name: "Statistiques",
        href: "/admin/stats",
        icon: BarChart3,
        current: false,
    },
    {
        name: "Rapports",
        href: "/admin/reports",
        icon: FileText,
        current: false,
    },
    {
        name: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
        current: false,
    },
]

const settingsItems = [
    {
        name: "Paramètres",
        href: "/admin/settings",
        icon: Settings,
    },
    {
        name: "Sécurité",
        href: "/admin/security",
        icon: Shield,
    },
    {
        name: "Aide",
        href: "/admin/help",
        icon: HelpCircle,
    },
]

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
    return (
        <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden animate-in fade-in duration-200"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed shadow inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Building className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
                                <p className="text-xs text-muted-foreground">Gestion immobilière</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Navigation</p>
                            {navigationItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground group",
                                        item.current
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground",
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            "mr-3 h-5 w-5 transition-colors",
                                            item.current ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                                        )}
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        <div className="pt-6 space-y-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Paramètres</p>
                            {settingsItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground group"
                                >
                                    <item.icon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-border">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">Admin Principal</p>
                                <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive bg-transparent"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Se déconnecter
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
