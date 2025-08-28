"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Header from "@/components/visitor/header"
import { Link } from "gatsby"
import axios from 'axios';
import Swal from 'sweetalert2';

export default function MotDePasseOubliePage() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Veuillez saisir une adresse email valide");
            setIsLoading(false);
            return;
        }

        const data = {
            email: email, // ✅ send the actual email string, not the regex
        };

        try {
            const res = await axios.post("/api/forgot", data);
            if (res.data.status === "success") {
                setIsSubmitted(true);
            }
        } catch (err) {
            if (err?.response.status === 404) {
                setError(err.response.data.description);
            } else {
                setError("Impossible d'envoyer le code. Veuillez réessayer.");
            }
        } finally {
            setIsLoading(false);
        }

    };


    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-black/10">
                <Header />

                <main className="container  mx-auto px-4 py-8">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-xxl  bg-card bg-white">
                            <CardHeader className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl font-serif text-primary">Email envoyé !</CardTitle>
                                <CardDescription className="text-muted-foreground">Vérifiez votre boîte mail</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <Alert className="border-green-200 bg-green-50">
                                    <AlertDescription className="text-sm text-green-800">
                                        Un email contenant un code de vérification et un lien de réinitialisation a été envoyé à{" "}
                                        <strong>{email}</strong>. Vérifiez également votre dossier spam.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground text-center">
                                        Vous n'avez pas reçu l'email ? Vérifiez votre dossier spam ou réessayez dans quelques minutes.
                                    </p>

                                    <Button
                                        onClick={() => {
                                            setIsSubmitted(false)
                                            setEmail("")
                                        }}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Renvoyer l'email
                                    </Button>
                                </div>

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

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <Card className="shadow-lg border-0 bg-card">
                        <CardHeader className="text-center space-y-2">
                            <CardTitle className="text-2xl font-serif text-primary">Mot de passe oublié</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Saisissez votre adresse email pour recevoir un lien de réinitialisation
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <Alert className="border-red-200 bg-red-50">
                                        <AlertDescription className="text-sm text-red-800">{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Adresse email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 transition-all duration-200 hover:shadow-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Envoi en cours..." : "Confirmer"}
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
