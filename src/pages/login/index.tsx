"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Link, navigate } from 'gatsby'
import Header from "@/components/visitor/header"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthContext } from "@/contexts/AuthProvider"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConnexionPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const [loginInput, setLogin] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { user, setUser } = useAuthContext()
  useEffect(() => {
    axios.get('/api/user/status').then(res => {


      if (res.data.role === 'owner') {

        navigate("/owner");
      } else if (res.data.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }).catch(err => {
      // setLoading(false);
    });

    return;
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setLogin((prev) => ({ ...prev, [field]: value }))
  }

  const loginSubmit = (e: any) => {

    e.preventDefault();
    setLoading(true);
    const data = {
      email: loginInput.emailOrUsername,
      password: loginInput.password,
    }

    axios.post('/api/login', data).then(res => {


      setUser(res.data.data.user)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }
      if (res.data.data.user.role === 'owner') {
        navigate("/owner");
      } else if (res.data.data.user.role === 'admin') {
        navigate("/admin");
      } else {
        console.log('visitor')
        navigate("/");
      }



    }).catch(err => {

      setError("Adresse mail ou mot de passe est incorrect");
      setLoading(false);
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-[#FFF8EA]">
          <Card className="shadow-lg border-0 bg-card">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-serif text-primary">Se connecter</CardTitle>
              <CardDescription className="text-muted-foreground">Accédez à votre compte LNT</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={loginSubmit} className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-sm text-red-800">{error}</AlertDescription>
                  </Alert>
                )}
                {/* Email ou nom d'utilisateur */}
                <div className="space-y-2">
                  <Label htmlFor="emailOrUsername" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="emailOrUsername"
                      type="text"
                      placeholder="votre@email.com"
                      value={loginInput.emailOrUsername}
                      onChange={(e) => handleInputChange("emailOrUsername", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

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
                      value={loginInput.password}
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

                {/* Lien mot de passe oublié */}
                <div className="text-right">
                  <Link
                    to="/forgot"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Bouton de connexion */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 transition-all duration-200 hover:shadow-lg"
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>

              {/* Lien vers inscription */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas encore de compte ?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Créer un compte
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
