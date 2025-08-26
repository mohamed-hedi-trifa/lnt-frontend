import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Heart, MapPin, Clock, Star, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Sécurité garantie",
    description: "Tous nos logements sont vérifiés et nos hôtes certifiés pour votre tranquillité d'esprit.",
  },
  {
    icon: Heart,
    title: "Expérience authentique",
    description: "Vivez comme un local grâce à nos hôtes passionnés qui partagent leurs meilleurs conseils.",
  },
  {
    icon: MapPin,
    title: "Partout en Tunisie",
    description: "Des plages de Djerba aux montagnes du Nord, trouvez le logement parfait où que vous alliez.",
  },
  {
    icon: Clock,
    title: "Réservation instantanée",
    description: "Réservez en quelques clics et recevez une confirmation immédiate de votre séjour.",
  },
  {
    icon: Star,
    title: "Qualité certifiée",
    description: "Nos logements sont notés par de vrais voyageurs pour vous aider à faire le bon choix.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description:
      "Notre équipe est disponible à tout moment pour vous accompagner avant, pendant et après votre séjour.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4  ">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir LNT ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous nous engageons à vous offrir la meilleure expérience de location en Tunisie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300 bg-[#FFF8EA]">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
