import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import reportHero from "../../../../assets/images/report-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire'
import Table from './Table';
import TabeFinancement from './TableFinancement';

export default function FinancialReportPage() {

    const dataTable = [
        { title: "Rapport_Financier_2023_AKDDCL.pdf", date: "2023-11-13", image: "/images/Pdf.png" },
        { title: "Rapport_Financier_2023_AKDDCL.pdf", date: "2023-11-13", image: "/images/Pdf.png" },
        { title: "Rapport_Financier_2023_AKDDCL.pdf", date: "2023-11-13", image: "/images/Pdf.png" },
        { title: "Rapport_Financier_2023_AKDDCL.pdf", date: "2023-11-13", image: "/images/Pdf.png" },
        { title: "Rapport_Financier_2023_AKDDCL.pdf", date: "2023-11-13", image: "/images/Pdf.png" },
        { title: "Rapport_Financier_2023_AKDDCL.pdf", date: "2023-11-13", image: "/images/Pdf.png" },
      ];
    
      const data = [
        {
         periode: "2022-2025",
         source: "MedFund",
         titreDuProjet: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)",
         description: "L’Aire Marine et Côtière Protégée des îlots nord de l’archipel de Kerkennah (AMCP) est un projet de préservation écologique visant à protéger la biodiversité marine unique de cette région. Située autour des îlots nord de l’archipel de Kerkennah en Tunisie, l'AMCP se concentre sur la sauvegarde des habitats marins sensibles, comme les prairies de posidonies, et des espèces emblématiques telles que la grande nacre et plusieurs espèces de tortues marines.",
         montant: '800.000 TND',
       },
       {
         periode: "2022-2025",
         source: "Fonds B",
         titreDuProjet: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)",
         description: "L’Aire Marine et Côtière Protégée des îlots nord de l’archipel de Kerkennah (AMCP) est un projet de préservation écologique visant à protéger la biodiversité marine unique de cette région. Située autour des îlots nord de l’archipel de Kerkennah en Tunisie, l'AMCP se concentre sur la sauvegarde des habitats marins sensibles, comme les prairies de posidonies, et des espèces emblématiques telles que la grande nacre et plusieurs espèces de tortues marines.",
         montant: '800.000 TND',
       },
      
       {
         periode: "2022-2025",
         source: "MedFund",
         titreDuProjet: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)",
         description: "L’Aire Marine et Côtière Protégée des îlots nord de l’archipel de Kerkennah (AMCP) est un projet de préservation écologique visant à protéger la biodiversité marine unique de cette région. Située autour des îlots nord de l’archipel de Kerkennah en Tunisie, l'AMCP se concentre sur la sauvegarde des habitats marins sensibles, comme les prairies de posidonies, et des espèces emblématiques telles que la grande nacre et plusieurs espèces de tortues marines.",
         montant: '800.000 TND',
       },
       {
         periode: "2022-2025",
         source: "Fonds B",
         titreDuProjet: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)",
         description: "L’Aire Marine et Côtière Protégée des îlots nord de l’archipel de Kerkennah (AMCP) est un projet de préservation écologique visant à protéger la biodiversité marine unique de cette région. Située autour des îlots nord de l’archipel de Kerkennah en Tunisie, l'AMCP se concentre sur la sauvegarde des habitats marins sensibles, comme les prairies de posidonies, et des espèces emblématiques telles que la grande nacre et plusieurs espèces de tortues marines.",
         montant: '800.000 TND',
       },
      
       {
         periode: "2022-2025",
         source: "MedFund",
         titreDuProjet: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)",
         description: "L’Aire Marine et Côtière Protégée des îlots nord de l’archipel de Kerkennah (AMCP) est un projet de préservation écologique visant à protéger la biodiversité marine unique de cette région. Située autour des îlots nord de l’archipel de Kerkennah en Tunisie, l'AMCP se concentre sur la sauvegarde des habitats marins sensibles, comme les prairies de posidonies, et des espèces emblématiques telles que la grande nacre et plusieurs espèces de tortues marines.",
         montant: '800.000 TND',
       },
       {
         periode: "2022-2025",
         source: "Fonds B",
         titreDuProjet: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)",
         description: "L’Aire Marine et Côtière Protégée des îlots nord de l’archipel de Kerkennah (AMCP) est un projet de préservation écologique visant à protéger la biodiversité marine unique de cette région. Située autour des îlots nord de l’archipel de Kerkennah en Tunisie, l'AMCP se concentre sur la sauvegarde des habitats marins sensibles, comme les prairies de posidonies, et des espèces emblématiques telles que la grande nacre et plusieurs espèces de tortues marines.",
         montant: '800.000 TND',
       },
      
               ];

    return (
        <div className=''>
            <img className='w-full object-cover h-[80vh]' src={reportHero} />
            <PageTitle title='Financial Report' width='w-[160px]' />
            <section>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex relative gap-8 py-10'>
                    <Sidebar />

                    <section className='w-fit text-justify text-[22px]'>
                        <div className='leading-10'>Notre association, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), est profondément enracinée dans la préservation du patrimoine unique de Kerkennah et engagée dans le développement durable. Nos principes et valeurs guident chaque initiative, de la protection de l’environnement à l’inclusion sociale, et reflètent notre vision d’une communauté prospère et autonome.</div>
                        <Table data={dataTable}/>
                    </section>
                    </section>

<section className='border-t border-[#ADA5A5]'>
                    <PageTitle title='Sources de financement' width='w-[160px]' color='text-black'/> 
                
                               <TabeFinancement data={data}/>
                               <div className="mt-[50px]"></div>
                               <div className=""></div>
                               <div className=""></div>
                
</section>

                <section className='border-t border-[#ADA5A5]'>
                    <ImageHistoire />
                </section>
                </div>
            </section>
        </div>
    )
}
