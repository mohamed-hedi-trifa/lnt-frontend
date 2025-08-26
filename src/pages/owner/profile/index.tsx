"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import {
    Home,
    User,
    Phone,
    Mail,
    Building2,
    MapPin,
    FileText,
    Menu,
    X,
    Plus,
    Bell,
    Star,
    CreditCard,
    MessageSquare,
    HelpCircle,
    Wallet,
    Users,
    CalendarDays,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/owner/sidebar"

export default function ProfilPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [ownerType, setOwnerType] = useState("particulier")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    // Données simulées du profil
    const [profileData, setProfileData] = useState({
        fullName: "Ahmed Benali",
        email: "ahmed.benali@email.com",
        phone: "+216 20 123 456",
        whatsapp: "+216 20 123 456",
        ownerType: "particulier",
        agencyName: "",
        billingAddress: "",
        taxId: "",
    })


    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }))
    }

    const handleOwnerTypeChange = (value: string) => {
        setOwnerType(value)
        setProfileData((prev) => ({ ...prev, ownerType: value }))
    }

    const handleSave = async () => {
        setIsLoading(true)

        // Simulation d'une sauvegarde
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Profil mis à jour",
            description: "Vos informations ont été sauvegardées avec succès.",
        })

        setIsLoading(false)
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
                                <h1 className="text-2xl font-serif font-bold text-foreground">Mon Profil</h1>
                                <p className="text-muted-foreground">Gérez vos informations personnelles</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <Bell className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Notifications</span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Profile Content */}
                <div className="p-4 lg:p-6 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {/* Personal Information Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="w-5 h-5 text-primary" />
                                    <span>Informations personnelles</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Nom complet</Label>
                                        <Input
                                            id="fullName"
                                            value={profileData.fullName}
                                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                                            placeholder="Votre nom complet"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Adresse email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                placeholder="votre@email.com"
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Numéro de téléphone</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                placeholder="+216 XX XXX XXX"
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="whatsapp">Numéro WhatsApp</Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="whatsapp"
                                                type="tel"
                                                value={profileData.whatsapp}
                                                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                                                placeholder="+216 XX XXX XXX"
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Owner Type Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Building2 className="w-5 h-5 text-primary" />
                                    <span>Type de propriétaire</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    value={ownerType}
                                    onValueChange={handleOwnerTypeChange}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                        <RadioGroupItem value="particulier" id="particulier" />
                                        <Label htmlFor="particulier" className="flex-1 cursor-pointer">
                                            <div>
                                                <p className="font-medium">Particulier</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Vous louez occasionnellement vos biens personnels
                                                </p>
                                            </div>
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                        <RadioGroupItem value="professionnel" id="professionnel" />
                                        <Label htmlFor="professionnel" className="flex-1 cursor-pointer">
                                            <div>
                                                <p className="font-medium">Professionnel</p>
                                                <p className="text-sm text-muted-foreground">Vous gérez plusieurs biens ou une agence</p>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {/* Professional Fields - Show only if owner type is professional */}
                                {ownerType === "professionnel" && (
                                    <div className="mt-6 space-y-6 p-4 bg-muted/50 rounded-lg">
                                        <h3 className="font-medium text-foreground">Informations professionnelles</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="agencyName">Nom de l'agence</Label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="agencyName"
                                                        value={profileData.agencyName}
                                                        onChange={(e) => handleInputChange("agencyName", e.target.value)}
                                                        placeholder="Nom de votre agence"
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="taxId">Matricule Fiscal</Label>
                                                <div className="relative">
                                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="taxId"
                                                        value={profileData.taxId}
                                                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                                                        placeholder="Votre matricule fiscal"
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="billingAddress">Adresse de facturation</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="billingAddress"
                                                        value={profileData.billingAddress}
                                                        onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                                                        placeholder="Adresse complète de facturation"
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <Button onClick={handleSave} disabled={isLoading} size="lg">
                                {isLoading ? "Sauvegarde..." : "Sauvegarder les modifications"}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
