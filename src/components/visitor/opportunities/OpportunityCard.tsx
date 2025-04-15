import { useTranslation } from '@/contexts/TranslationContext';
import { Link } from 'gatsby';
import React from 'react';
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import PageParagraph2 from '@/components/atoms/PageParagraph2';
import ButtonCard from '@/components/atoms/ButtonCard';


export default function OpportunityCard({ opportunity }: { opportunity: any }) {
    const { t, lang } = useTranslation();
    

    const calculateTimeRemaining = (dueDate:any) => {
        if (!dueDate) return "N/A";
    
        const now = new Date();
        const due = new Date(dueDate);
        const diffMs = due.getTime() - now.getTime();
    
        if (diffMs <= 0) return "Expiré";
    
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    
        if (totalHours < 24) {
            return totalHours + " Heures";
        }
    
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
    
        if (days < 30) {
            return hours === 0 
                ? days + " Jours" 
                : days + " Jours " + hours + " Heures";
        } else {
            const months = Math.floor(days / 30);
            const remainingDays = days % 30;
            let result = months + " Mois";
            if (remainingDays > 0) {
                result += " " + remainingDays + " Jours";
            }
            return result;
        }
    };

    return (
        <>
            <div className="flex flex-col bg-white rounded-xl pb-5 h-full sm:w-[300px] w-[350px] shadow-helmi ">
                <div className="flex w-full justify-between px-4 sm:py-2 py-3 items-center">
                    <h4 className='font-bold  '>{opportunity?.type}</h4>
                    <span className={` w-3 h-3 rounded-[50%] ${calculateTimeRemaining(opportunity?.due_date) !== "Expiré" ? "bg-[#29F11B]" : "bg-[#FF0000]"}`}></span>

                </div>

                <img className="w-full sm:h-[222px] h-[202px] object-cover shadow-helmi"
                    src={`${process.env.GATSBY_API_URL}${opportunity?.image}`}
                    alt={opportunity?.title_en || opportunity?.title_fr} />

                <div  className="py-2 text-start px-5 flex-grow">

                    <h3 className='font-semibold sm:text-xl min-h-[29px]'>
                        {opportunity?.title_en || opportunity?.title_fr}
                    </h3>
                    <PageParagraph2>
                    <h3 className='font-normal text-[14px] mt-2 min-h-[55px]'>
                        {(opportunity?.description_en || opportunity?.description_fr)?.length > 80
                            ? (opportunity?.description_en || opportunity?.description_fr)?.slice(0, (opportunity?.description_en || opportunity?.description_fr)?.lastIndexOf(" ", 80)) + "..."
                            : (opportunity?.description_en || opportunity?.description_fr)}
                    </h3>
                    </PageParagraph2>
                </div>

                {/* Location & Expiry Information */}
                <div className="w-full text-start self-start  ">
                    <div className="flex justify-center">
                        <hr className="mt-2 w-full max-w-[275px] border-t border-gray-600" />
                    </div>
                    <div className='mx-3 mt-3'>
                        <div className='font-normal text-[14px]'>
                            <span className='text-[#0270A0] font-bold text-[16px]'>Lieu : </span>
                            {opportunity?.location_en || opportunity?.location_fr}
                        </div>

                        <div className='text-start text-[14px] mt-1 font-normal pb-4 '>
                            <span className='text-[#FF0000] font-bold text-[16px]'>Expire dans : </span>
                            {calculateTimeRemaining(opportunity?.due_date)}
                        </div>
                    </div>        
                    <div className='flex justify-center'>
                        <Link to={`/opportunities/opportunity-details/${opportunity?.slug}?lang=${lang}`}>
                         <ButtonCard variant="primary"  >  
                            Voir les détails
                         </ButtonCard>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
}



