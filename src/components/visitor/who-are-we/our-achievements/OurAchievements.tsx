import React, { useEffect, useState } from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ImageHistoire from '../our-team/ImageHistoire'
import achievementsHero from "../../../../assets/images/achievements-hero.jpg";
import AchievementsCards from './AchievementsCards';
import HeroSection from '../../HeroSection';
import PageParagraph from '../../../atoms/PageParagraph';
import PageBody from '@/components/PageBody'
import ButtonDropdown from '@/components/ButtonDropdown'
import DateRangeSelector from '../../who-are-we/our-achievements/DateRangeSelector'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Checkbox from '../../posts/Checkbox'
import FilterTitle from '../../posts/FilterTitle'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import { Link } from 'gatsby'
import XIcon from '@/assets/icons/XIcon'
import InstagramIcon from '@/assets/icons/InstagramIcon'
import YoutubeIcon from '@/assets/icons/YoutubeIcon'
import LinkedinIcon from '@/assets/icons/LinkedinIcon'
import Button from '@/components/atoms/Button'
import NewsLetterSub2 from '@/components/NewsLetterSub2'
import Line from '@/components/atoms/Line'
import FilterIcon from '@/assets/icons/FilterIcon'
import sortIcon from "@/assets/icons/sort-icon.png"

const CATEGORIES = [
    {
      id: 1,
      name: "All themes"
    },
    {
      id: 2,
      name: "Conservation Marine"
    },
    {
      id: 3,
      name: "Tourisme Responsable"
    },
    {
      id: 4,
      name: "Peche Durable"
    },
    {
      id: 5,
      name: "Ecologie et Environmenet"
    },
    {
      id: 6,
      name: "Education et Formation"
    }
  ]

export default function OurAchievements() {
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        if (isOpened) {
          document.querySelector("body")!.style.overflow = "hidden";
        } else {
          document.querySelector("body")!.style.overflow = "visible";
        }
      })

      const LeftSidebar = () => <aside className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? "translate-x-0" : "translate-x-[-100%]"}`} >
      <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'
          style={{
            boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
        }}>
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" />
        </div>

        {/* Thèmes */}
        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Tous les Thèmes" nb="120" />
            <Checkbox label="Initiative scientifique" nb="35" />
            <Checkbox label="Suivi scientifique" nb="28" />
            <Checkbox label="Formation" nb="30" />
            <Checkbox label="Événement culturel" nb="18" />
            <Checkbox label="Activités sportives" nb="21" />
            <button className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium">
              + Afficher 10 de plus
            </button>
          </div>
        </div>
  
        {/* Date */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Aujourd'hui" />
            <Checkbox label="Cette Semaine" />
            <Checkbox label="Ce Mois" />
            <Checkbox label="Cette Année" />
            <ButtonDropdown
              item={<DateRangeSelector />}
              position="left"
              renderItem={(item) => (
                <div className='py-1'>{item.name}</div>
              )}
            >
              {(isOpen) => (
                <Checkbox label="Configurer" />
              )}
            </ButtonDropdown>
          </div>
        </div>
  
        {/* Actions */}
        <div className="flex justify-between">
          <button className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold">
            Appliquer les Filtres
          </button>
          <button className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]">
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>;
  
    const RightSidebar = () => <aside className={`flex flex-col gap-6 sm:sticky top-[116px] h-fit px-5`}>
      <div className="text-[#183354] text-xl font-bold font-['Montserrat'] capitalize leading-relaxed">Suivez-nous</div>
      <Line />
  
      <div className='grid grid-cols-2 gap-1'>
        <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
          <div className='text-black'><FacebookIcon /></div>
          <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">facebook</div>
        </Link>
        <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
          <div className='text-black'><XIcon /></div>
          <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">X</div>
        </Link>
        <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
          <div className='text-black'><InstagramIcon /></div>
          <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Instagram</div>
        </Link>
        <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
          <div className='text-black'><YoutubeIcon /></div>
          <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Youtube</div>
        </Link>
        <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
          <div className='text-black'><LinkedinIcon /></div>
          <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Linkedin</div>
        </Link>
      </div>
  
       <NewsLetterSub2 title="Ne manquez rien !" paragraph="Inscrivez-vous à notre newsletter pour Recevez les dernières nouvelles sur nos réalisations et projets directement dans votre boîte mail"/>
      <div className="h-[279.40px] flex-col justify-center gap-[25px] flex">
        <div className="self-stretch h-[26.40px] text-[#183354] text-xl font-bold font-['Montserrat'] capitalize leading-relaxed">Une Question ?</div>
        <Line />
        <div className="w-[300px] text-black text-[15px] font-bold font-['Montserrat'] capitalize leading-normal">Besoin de plus d'informations ? N'hésitez pas à nous contacter. Cliquez sur le Bouton ci-dessous pour accéder à notre page de contact et poser vos questions</div>
        <Button variant='primary' customClassnames='mx-auto'>
          <div className="text-white text-xl font-bold font-['Montserrat'] leading-tight">Contactez-Nous</div>
        </Button>
      </div>
    </aside>;
    
      
    return (
        <main className={`relative`}>
            <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
             <HeroSection imgSrc={achievementsHero} title="Nos Actions, Notre Impact" subTitle={<div><div>Découvrez les projets qui transforment Kerkennah :</div> des initiatives locales qui protègent, valorisent et inspirent</div>} />
             <PageTitle title='Our Achievements' />
             <PageBody>
                <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                    <Sidebar />

                    <section className='w-fit flex flex-col gap-12'>
                        <PageParagraph>Depuis sa création, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'engage activement pour la préservation de l'archipel de Kerkennah, en alliant le développement durable, la protection de l’environnement et la valorisation de la culture locale. Nous menons des initiatives variées, allant du soutien aux pratiques de pêche durable aux projets éducatifs et culturels, afin de créer un impact positif et pérenne pour notre communauté. Nos actions, qu’il s’agisse d’ateliers de transmission des savoir-faire traditionnels, de festivals célébrant le patrimoine ou de programmes de sensibilisation aux enjeux écologiques, contribuent à renforcer l’identité et l’autonomie économique de notre île.</PageParagraph>
                        <PageParagraph>Chaque projet est réalisé en étroite collaboration avec nos partenaires locaux et internationaux, ainsi qu’avec la communauté, qui est au cœur de notre démarche. De plus, nous honorons les anciens membres fondateurs dont la vision et le dévouement ont permis d’établir les bases de cette mission essentielle. Leur héritage continue de guider nos actions, garantissant ainsi la pérennité et le dynamisme de Kerkennah pour les générations futures.</PageParagraph>                       
                    </section>
                </section>
            </PageBody>
             <section className='max-w-[1400px] mx-auto'>
                <hr className='my-6  border-black' />  

                <section className="flex flex-col sm:flex-row gap-5">
          {/* Sidebar */}
          <LeftSidebar />

          {/* Main content area (example placeholder) */}
          <section className="flex-1">
            <div className='hidden sm:flex justify-between relative z-20'>
              <ButtonDropdown
                items={CATEGORIES}
                position="left"
                renderItem={(item) => (
                  <div className='py-1 px-4'> {item.name}</div>
                )}
              >
                {(isOpen) => (
                  <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                    <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                      <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                      <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                      <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                    </div>
                  </button>
                )}
              </ButtonDropdown>

              <div className="text-center text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]">1 - 12 de 150 Publication</div>
            </div>
            <div className='sm:hidden flex justify-between pr-5 relative z-20'>
              <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
                <FilterIcon />
                <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
              </button>
              <ButtonDropdown
                items={CATEGORIES}
                position="right"
                renderItem={(item) => (
                  <div className='py-1 px-4'> {item.name}</div>
                )}
              >
                {(isOpen) => (
                  <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                    <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                      <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                      <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                      <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                    </div>
                  </button>
                )}
              </ButtonDropdown>
            </div>
            <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5'>1 - 12 de 150 Publication</div>
            <AchievementsCards />
          </section>

          <RightSidebar />
         </section>

         </section>
         <section className='max-w-6xl mx-auto my-10'>
        <hr className='border-black'></hr>
        <section className='flex items-start justify-center mb-20 mt-10'>

          <div className='w-full flex items-center justify-center '>
          <ImageHistoire />
          </div>

        </section>
      </section>
        </main>
    )
}
