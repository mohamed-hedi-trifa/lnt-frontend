"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, User, Mail, Phone, Lock, UserCheck } from "lucide-react"
import Swal from 'sweetalert2';
import Header from "@/components/visitor/header"
import { Label } from "@/components/ui/label"
import { Link, navigate } from 'gatsby'
import { useAuthContext } from "@/contexts/AuthProvider"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function InscriptionPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userRole, setUserRole] = useState("visitor")
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

  })
  const { user, setUser } = useAuthContext()
  const handleInputChange = (field: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      firstname: registerData.firstName,
      lastname: registerData.lastName,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
      userRole: userRole

    }

    axios.post('/api/register', data).then(res => {

      setUser(res.data.data.user)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.data.token)
      }
      if (res.data.data.user.role === 'owner') {
        navigate("/owner");
      } else if (res.data.data.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }



    }).catch(err => {
      setLoading(false);

      if (err.response?.data?.data) {

        const validationErrors = err.response.data.data;


        const messages = Object.values(validationErrors).flat().join("\n");

        setError(messages);
      } else {
        setError("Une erreur est survenue, veuillez réessayer.");
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-[#FFF8EA]">
          <Card className="shadow-xl ">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-serif text-primary">Créer un compte</CardTitle>
              <CardDescription className="text-muted-foreground">
                Rejoignez notre communauté de location
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-sm text-red-800">{error}</AlertDescription>
                  </Alert>
                )}
                {/* Nom et Prénom */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Prénom
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Votre prénom"
                        value={registerData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Nom
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Votre nom"
                        value={registerData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
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
                      value={registerData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Rôle utilisateur */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Vous êtes
                  </Label>
                  <Select value={userRole} onValueChange={setUserRole} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez votre rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visiteur">Visiteur</SelectItem>
                      <SelectItem value="proprietaire">Propriétaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Téléphone (conditionnel pour propriétaires) */}
                {userRole === "proprietaire" && (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Numéro de téléphone portable
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+216 XX XXX XXX"
                        value={registerData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Ce numéro sera utilisé pour les contacts WhatsApp</p>
                  </div>
                )}

                {/* Mot de passe */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={registerData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Mot de passe */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmer votre mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmer votre mot de passe"
                      value={registerData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Bouton d'inscription */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-primary hover:bg-primary/90 font-medium py-3 transition-all duration-200 hover:shadow-lg"
                >

                  {loading ? "chargement..." : "Créer mon compte"}
                </Button>
              </form>

              {/* Lien vers connexion */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
