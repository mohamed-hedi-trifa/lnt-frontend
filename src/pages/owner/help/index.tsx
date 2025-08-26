"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Home,
    Star,
    Bell,
    Plus,
    CreditCard,
    MessageSquare,
    User,
    HelpCircle,
    Wallet,
    Menu,
    X,
    Users,
    CalendarDays,
    MapPin,
    Phone,
    Clock,
    Info,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/owner/sidebar"

export default function AideSupport() {
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
                                <h1 className="text-2xl font-serif font-bold text-foreground">Aide & Support</h1>
                                <p className="text-muted-foreground">Nous sommes là pour vous aider</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Support Content */}
                <div className="p-4 lg:p-6 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {/* Main Support Card */}
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <HelpCircle className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Besoin d'aide ?</CardTitle>
                                <CardDescription className="text-base">
                                    Notre équipe support est disponible pour répondre à toutes vos questions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Contact Methods */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Phone Contact */}
                                    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Phone className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold mb-2">Appelez-nous</h3>
                                            <p className="text-muted-foreground text-sm mb-3">Pour une assistance immédiate</p>
                                            <Button asChild className="w-full">
                                                <a href="tel:99513872">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    99 513 872
                                                </a>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* WhatsApp Contact */}
                                    <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <MessageSquare className="w-6 h-6 text-green-600" />
                                            </div>
                                            <h3 className="font-semibold mb-2">WhatsApp</h3>
                                            <p className="text-muted-foreground text-sm mb-3">Contactez-nous par message</p>
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                                            >
                                                <a href="https://wa.me/21699513872" target="_blank" rel="noopener noreferrer">
                                                    <MessageSquare className="w-4 h-4 mr-2" />
                                                    +216 99 513 872
                                                </a>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Support Hours */}
                                <Card className="bg-muted/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm font-medium">Support disponible tous les jours de 9h à 18h</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Contact Button */}
                                <div className="pt-4">
                                    <Button asChild size="lg" className="w-full md:w-auto">
                                        <a
                                            href="https://wa.me/21699513872?text=Bonjour, j'ai besoin d'aide avec mon compte LNT"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Contacter le support maintenant
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* FAQ Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Info className="w-5 h-5 text-primary" />
                                    <span>Questions fréquentes</span>
                                </CardTitle>
                                <CardDescription>Trouvez rapidement des réponses aux questions les plus courantes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <h4 className="font-medium mb-2">Comment publier une nouvelle annonce ?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Rendez-vous dans "Créer une annonce" depuis votre tableau de bord et suivez les étapes.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <h4 className="font-medium mb-2">Comment gérer mes réservations ?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Accédez à la section "Réservations" pour voir, modifier ou annuler vos réservations.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <h4 className="font-medium mb-2">Problème de paiement ?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Contactez-nous directement par téléphone ou WhatsApp pour une assistance rapide.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
