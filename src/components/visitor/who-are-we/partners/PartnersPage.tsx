import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import partnersHero from '../../../../assets/images/partners-hero.jpg'
import ImageHistoire from '../our-team/ImageHistoire'
import Partners from './Partners'
import HeroSection from '../../HeroSection'
import PageParagraph from '@/components/atoms/PageParagraph'

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
)

const PartnerSkeleton = () => (
  <div className="border-[#E8E8EA] border-[1.5px] p-4 box-border rounded-[30px] shadow-helmi flex justify-center">
    <ShimmerBar className="h-[150px] w-full" />
  </div>
)

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const getPartners = async () => {
    try {
      const res = await axios.get('/api/get-general-parteners')
      setPartners(res.data)
    } catch (err: any) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch edition', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPartners()
  }, [])

  return (
    <div>
      <HeroSection
        imgSrc={partnersHero}
        title="Des Alliances pour un Futur Meilleur"
        subTitle="Nos partenaires locaux et internationaux sont au cœur de nos succès : ensemble, nous façonnons un avenir durable"
      />
      <PageTitle title="Partners" />
      <section className="px-4 sm:px-0">
        <section className="max-w-6xl mx-auto flex flex-col gap-12">
          <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
            <Sidebar />
            <section className="w-fit text-justify text-[22px]">
              <PageParagraph>
                Le succès des projets de l’Association Kratten du Développement Durable de la Culture et du Loisir
                (AKDDCL) repose en grande partie sur la collaboration et le soutien de nos partenaires. Grâce à eux,
                nous avons pu concrétiser des initiatives environnementales, culturelles et éducatives au service de
                l’archipel de Kerkennah et de sa communauté. Nos partenaires incluent des organisations locales et
                internationales, des institutions académiques, des ONG, et des entreprises privées qui partagent notre
                engagement pour la durabilité, la préservation de la culture et la promotion de la biodiversité. Chaque
                partenariat enrichit nos projets par l’échange de savoir-faire, de ressources et de perspectives,
                renforçant ainsi notre mission.
              </PageParagraph>
            </section>
          </section>
          <section className="border-t border-[#000000] pb-10">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-10 pt-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PartnerSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Partners partners={partners} />
            )}
          </section>
          <section className="border-t border-black sm:pb-20 pb-20">
            <ImageHistoire />
          </section>
        </section>
      </section>
    </div>
  )
}
