import React from 'react'
import { useState } from "react"
import {
    Home,
    Star,
    Bell,
    Plus,
    CreditCard,
    User,
    HelpCircle,
    Wallet,
    X,
    MapPin,

} from "lucide-react"
import { Button } from '../ui/button'
import Link from "next/link"

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: any;
    setSidebarOpen: (open: any) => void;
}) {


    const sidebarItems = [
        { icon: Home, label: "Tableau de bord", href: "/owner", active: true },
        { icon: MapPin, label: "Mes annonces", href: "/owner/announcements" },
        { icon: Plus, label: "Créer une annonce", href: "/owner/announcements/create" },
        { icon: CreditCard, label: "Abonnement & Paiement", href: "/owner/subscription" },
        { icon: Wallet, label: "Caisse", href: "/owner/caisses", highlight: true },
        { icon: Bell, label: "Notifications", href: "/owner/notifications" },
        { icon: User, label: "Profil", href: "/owner/profile" },
        { icon: HelpCircle, label: "Aide & Support", href: "/owner/help" },
    ]
    return (
        <div>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Home className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-serif font-bold text-lg text-sidebar-foreground">LNT Pro</span>
                    </div>
                    <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <div
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${item.active
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    )
}
