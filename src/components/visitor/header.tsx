"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/search" className="text-foreground hover:text-primary transition-colors">
              Logements
            </Link>
            <Link href="/favorites" className="text-foreground hover:text-primary transition-colors">
              Favoris
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="sm">Inscription</Button>
            </Link>
          </div>

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
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                Logements
              </Link>
              <Link href="/favorites" className="text-foreground hover:text-primary transition-colors">
                Favoris
              </Link>
              <Link href="#" className="text-foreground hover:text-primary transition-colors">
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
    </header>
  )
}
