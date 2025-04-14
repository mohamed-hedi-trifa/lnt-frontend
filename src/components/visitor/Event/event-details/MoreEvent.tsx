import React from 'react'
import { Link } from 'gatsby';
import MoreEventCard from './MoreEventCard';
import { useTranslation } from '@/contexts/TranslationContext';
import { IEvent } from '@/models/IEvent';
import LangLink from '@/components/LangLink';
import Title from '@/components/atoms/titles/Title';
import PageParagraph2 from "@/components/atoms/PageParagraph2";

interface SectionHeaderProps {
  title: React.ReactNode;
  text: string;
}
const SectionHeader = ({ title, text }: SectionHeaderProps) => (
  <div className="flex flex-col items-center text-center justify-center py-10">
    <Title size="text-2xl sm:text-[36px] pb-4">{title}</Title>
    <PageParagraph2>
      <p className="font-semibold text-lg sm:text-[20px] text-center max-w-3xl mx-auto">
        {text}
      </p>
    </PageParagraph2>
  </div>
);
export default function MoreEvent({ moreEvents }: { moreEvents: any }) {
    const { t, lang } = useTranslation();
    
    return (
        <div>
            <SectionHeader 
            title={<span><span className="text-primary">Explorez</span> Plus d'Événements</span>}
            text="Découvrez d'autres activités passionnantes et moments à partager"
          />

            <div className="flex justify-center gap-9 pb-10 sm:px-0 px-5 flex-col sm:flex-row">

                {
                    moreEvents.map((event:IEvent) => (
                            <MoreEventCard event={event} custunCss="px-16" />
                    ))
                }
 
            </div>
            <LangLink to="/event">
                <button className="px-8 py-3 my-4 bg-gradient-to-r from-[#006E9F] via-[#51ADC6] to-[#006E9F] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right text-white font-bold rounded-full shadow-md">
                    Voir Tous les Événements
                </button>
            </LangLink>
        </div>
        
    )
}
