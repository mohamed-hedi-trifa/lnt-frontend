"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search } from "lucide-react"
import Image from "next/image"
import axios from 'axios';


import { useAuthContext } from "@/contexts/AuthProvider"
import { Link, navigate } from "gatsby"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, setUser } = useAuthContext()
  const [showModal, setShowModal] = useState(false);


  const handleLogout = async (e: any) => {
    try {
      await axios.post('/api/logout').then(res => {
        if (res.data.status == "Logged out successfully") {
          e.preventDefault();
          if (typeof window !== "undefined") {
            localStorage.removeItem('token');
          }
            setUser(null);
            navigate("/");
          }

        });


      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="LNT Logo" width={40} height={40} className="w-10 h-10" />
            <span className="font-serif font-bold text-xl text-primary hidden sm:block">LNT</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Rechercher une ville, un quartier..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/search" className="text-foreground hover:text-primary transition-colors">
              Logements
            </Link>
            <Link to="/favorites" className="text-foreground hover:text-primary transition-colors">
              Favoris
            </Link>
            <Link to="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {
            !user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Inscription</Button>
                </Link>
              </div>
            ) : user?.role !== 'visitor' ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link to={user?.role === 'admin' ? "/admin" : "/owner"}>
                  <Button variant="outline" size="sm">
                    Espace {user?.role === 'admin' ? 'Admin' : 'Pro'}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowModal(true)

                  }}
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(true)}
                >
                  Déconnexion
                </Button>
              </div>
            )
          }


          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Rechercher une ville..." className="pl-10 pr-4 py-2 w-full" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/search" className="text-foreground hover:text-primary transition-colors">
                Logements
              </Link>
              <Link to="/favorites" className="text-foreground hover:text-primary transition-colors">
                Favoris
              </Link>
              <Link to="#" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <div className="flex space-x-3 pt-3">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Connexion
                </Button>
                <Button size="sm" className="flex-1">
                  Inscription
                </Button>
              </div>
            </nav>
          </div>
        )}

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirmer la déconnexion</h2>
            <p className="mb-6 text-sm text-gray-600">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </header >
  )
}
