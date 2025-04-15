import React, { useState } from 'react';
import OpportunityCard from '../OpportunityCard';
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
export default function OtherOppertunities({moreOpportunities} : {moreOpportunities:any}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div >            
            <SectionHeader 
             title={<span><span className="text-primary">Découvrez</span>  d'autres Opportunités</span>}
             text="Explorez nos autres offres et trouvez l'opportunité qui correspond à vos aspirations"
             />
            <div className='flex justify-center gap-9 pb-10 sm:px-0 px-5 flex-col sm:flex-row'>
                {moreOpportunities?.map((opportunity) => (

                    <OpportunityCard opportunity={opportunity} />

                ))}
            </div>





            <LangLink to="/opportunities">
                <button className="px-8 py-3 my-4 bg-gradient-to-r from-[#006E9F] via-[#51ADC6] to-[#006E9F] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right text-white font-bold rounded-full shadow-md">
                    Voir Toutes les Opportunités
                </button>
            </LangLink>

     
        </div >
    );
}
