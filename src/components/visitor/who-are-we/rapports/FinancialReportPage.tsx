import axios from "axios";
import React, { useEffect, useState } from "react";
import PageTitle from '../../../atoms/titles/PageTitle';
import Sidebar from '../../../layout/Sidebar';
import reportHero from "../../../../assets/images/report-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire';
import Table from './Table';
import TabeFinancement from './TableFinancement';
import PageParagraph from '../../../atoms/PageParagraph';
import Swal from "sweetalert2";
import HeroSection from '../../HeroSection';

export default function FinancialReportPage() {
  const [loading, setLoading] = useState(true);
  const [financialReport, setFinancialReport] = useState([]);
  const [financialSource, setFinancialSource] = useState([]);

  function getFinancialReport() {
    axios
      .get("/api/financial-report")
      .then((res) => {
        setFinancialReport(res.data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  }
  
  function getFinancialSource() {
    axios
      .get("/api/financial-source")
      .then((res) => {
        setFinancialSource(res.data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  }
  
  useEffect(() => {
    getFinancialReport();
    getFinancialSource();
    return;
  }, []);

  return (
    <div className=''>
      <HeroSection 
        imgSrc={reportHero} 
        title="Une Décennie d'Engagement Durable" 
        subTitle="Depuis 2014, L'Association Kratten écrit une histoire de préservation environnementale, de valorisation culturelle, et de développement durable à Kerkennah" 
      />
      <PageTitle title='Financial Report' />
      <section className='px-4 sm:px-0'>
        <div className='max-w-[1206px] mx-auto'>
          <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
            <Sidebar />
            {/* Remplacer w-fit par w-full pour que le container prenne toute la largeur */}
            <section className='w-full flex flex-col gap-12 pb-10'>
              <PageParagraph>
                Notre association, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), est profondément enracinée dans la préservation du patrimoine unique de Kerkennah et engagée dans le développement durable. Nos principes et valeurs guident chaque initiative, de la protection de l’environnement à l’inclusion sociale, et reflètent notre vision d’une communauté prospère et autonome.
              </PageParagraph>
              <Table data={financialReport} />
            </section>
          </section>

          <section className='border-t border-black flex flex-col gap-10 pb-10'>
            <div className='flex flex-col'>
              <PageTitle title={<div><span className='text-primary'>Sources</span> de financement</div>} color='text-black' />
              <div className="text-xl font-medium text-center max-w-[850px] mx-auto">
                <PageParagraph fontWeight="medium" spacing="normal">
                  <div className='text-xl font-medium text-center max-w-[850px] mx-auto'>
                    Découvrez les différentes contributions et partenariats financiers qui permettent de concrétiser nos projets et de soutenir nos actions en faveur du développement durable et culturel
                  </div>
                </PageParagraph>
              </div>
            </div>
            <TabeFinancement data={financialSource} />
          </section>

          <section className='border-t border-black pb-20'>
            <ImageHistoire />
          </section>
        </div>
      </section>
    </div>
  )
}
