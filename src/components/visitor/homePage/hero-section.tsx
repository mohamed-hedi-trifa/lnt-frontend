
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Users } from "lucide-react"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"

export default function HeroSection() {
  return (
    <section className="relative  bg-[#FDF4F0] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
            Trouvez votre logement idéal en Tunisie
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez des logements uniques proposés par des particuliers dans toute la Tunisie
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-card rounded-lg shadow-lg p-6 max-w-4xl mx-auto bg-[#FFF8EA]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground text-black/80">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Tunis, Sousse, Hammamet..." className="pl-10 text-black" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground text-black/80">Type de logement</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tous types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="maison">Maison</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground text-black/80">Prix par nuit</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50">0 - 50 TND</SelectItem>
                  <SelectItem value="50-100">50 - 100 TND</SelectItem>
                  <SelectItem value="100-200">100 - 200 TND</SelectItem>
                  <SelectItem value="200+">200+ TND</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground text-black/80">Voyageurs</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 voyageur</SelectItem>
                    <SelectItem value="2">2 voyageurs</SelectItem>
                    <SelectItem value="3">3 voyageurs</SelectItem>
                    <SelectItem value="4+">4+ voyageurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button size="lg" className="px-8 text-white bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
