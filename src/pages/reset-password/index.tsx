"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Key, CheckCircle, ArrowLeft } from "lucide-react"
import Header from "@/components/visitor/header"
import { Link } from "gatsby"
import axios from 'axios';


export default function ReinitialiserMotDePassePage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})


    const [formData, setFormData] = useState<{
        email: string;
        token: string;
        password: string;
        confirmPassword: string;
    }>({
        email: "",
        token: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");
        const emailFromUrl = params.get("email");

        if (tokenFromUrl) {
            setFormData(prev => ({ ...prev, token: tokenFromUrl }));
            setFormData(prev => ({ ...prev, email: emailFromUrl ?? "" }));

        }
    }, []);
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Effacer l'erreur du champ modifié
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = async () => {
        const newErrors: { [key: string]: string } = {}

        // Validation du token
        if (!formData.token.trim()) {
            newErrors.token = "Le token de vérification est requis"
        } else if (formData.token.length !== 6) {
            newErrors.token = "Le token doit contenir 6 caractères"
        }

        // Validation du mot de passe
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis"
        } else if (formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
        }

        // Validation de la confirmation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
        }




        try {
            const res = await axios.post("/api/reset", formData);
            if (res.data.status === "success") {
                setErrors(newErrors)
                return Object.keys(newErrors).length === 0
            }
        } catch (err) {

        }




    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Simulation de vérification du token et mise à jour du mot de passe
            await new Promise((resolve) => setTimeout(resolve, 2000))

            const params = new URLSearchParams(window.location.search);
            const tokenFromUrl = params.get("token");
            // Simulation d'un token incorrect (pour démonstration)
            if (formData.token !== tokenFromUrl) {
                setErrors({ token: "token de vérification incorrect. Vérifiez votre email." })
                setIsLoading(false)
                return
            }

            setIsSuccess(true)
        } catch (err) {
            setErrors({ general: "Une erreur est survenue. Veuillez réessayer." })
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background">
                <Header />

                <main className="container mx-auto px-4 py-8">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg border-0 bg-card">
                            <CardHeader className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl font-serif text-primary">Mot de passe modifié !</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Votre mot de passe a été mis à jour avec succès
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <Alert className="border-green-200 bg-green-50">
                                    <AlertDescription className="text-sm text-green-800">
                                        Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                                    </AlertDescription>
                                </Alert>

                                <Button
                                    asChild
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 transition-all duration-200 hover:shadow-lg"
                                >
                                    <Link to="/login">Se connecter</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <Card className="shadow-lg border-0 bg-card">
                        <CardHeader className="text-center space-y-2">
                            <CardTitle className="text-2xl font-serif text-primary">Nouveau mot de passe</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Saisissez le token reçu par email et votre nouveau mot de passe
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errors.general && (
                                    <Alert className="border-red-200 bg-red-50">
                                        <AlertDescription className="text-sm text-red-800">{errors.general}</AlertDescription>
                                    </Alert>
                                )}

                                {/* token de vérification */}
                                <div className="space-y-2">
                                    <Label htmlFor="token" className="text-sm font-medium">
                                        Code de vérification
                                    </Label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            id="token"
                                            type="text"
                                            placeholder="123456"
                                            value={formData.token}
                                            onChange={(e) => handleInputChange("token", e.target.value)}
                                            className="pl-10 "
                                            maxLength={6}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.token && <p className="text-sm text-red-600">{errors.token}</p>}
                                </div>

                                {/* Nouveau mot de passe */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Nouveau mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Votre nouveau mot de passe"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            className="pl-10 pr-10"
                                            required
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                </div>

                                {/* Confirmation mot de passe */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                        Confirmer le mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirmez votre mot de passe"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                            className="pl-10 pr-10"
                                            required
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                                </div>

                                {/* Critères de sécurité */}
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <p>Le mot de passe doit contenir :</p>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                        <li>Au moins 8 caractères</li>
                                        <li>Une majuscule et une minuscule</li>
                                        <li>Au moins un chiffre</li>
                                    </ul>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 transition-all duration-200 hover:shadow-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                                </Button>
                            </form>

                            <div className="text-center pt-4 border-t border-border">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Retour à la connexion
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
