
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CarouselCard from '@/components/visitor/our-festival/CarouselCard';
import ListCardFestivales from '@/components/visitor/our-festival/ListCardsFestival';
import HeroSection from '@/components/visitor/HeroSection';
import PageTitle from '@/components/atoms/titles/PageTitle';
import Title from '@/components/atoms/titles/Title';
import Partners from '@/components/visitor/who-are-we/partners/Partners';
import PinnedImageSwap from '@/components/visitor/our-festival/upcoming/SwappingImagesOnScroll';
import ImageGallery from '@/components/visitor/ImageGallery';
import Media from '@/components/visitor/Media';
import PastEditionsCarousel from '@/components/visitor/our-festival/PastEditionsCarousel';
import EventsEditionCards from "@/components/visitor/our-festival/upcoming/EventsEditionCards";









const gallery = [
  '/festivales_images/img1.jpg',
  '/festivales_images/img2.jpg',
  '/festivales_images/img3.jpg',
  '/festivales_images/img4.jpg',
  '/festivales_images/img5.jpg',
  '/festivales_images/img6.jpg',
  '/festivales_images/img7.jpg',
  '/festivales_images/img8.jpg',
  '/festivales_images/img9.jpg',
  '/festivales_images/img10.jpg',
  '/festivales_images/img.jpg',



]





export default function FestivalVenir() {
  const [edition, setEdition] = useState([]);
  const [prevEditions, setprevEditions] = useState([]);

  const getEdition = async () => {
    try {
      const res = await axios.get("/api/get-current-edition");
      setEdition(res.data);

    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch Edition", "error");
    }
  };

  const getprevEditions = async () => {
    try {
      const res = await axios.get("/api/previous-editions");
      setprevEditions(res.data);
   
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch Edition", "error");
    }
  };


  useEffect(() => {
    getEdition();
    getprevEditions();
  }, []);

  return (
    <div className=''>

      <HeroSection imgSrc={gallery[9]} title='Festival à Venir' subTitle="Une Nouvelle Aveture Culturelle vous Attend !" />


      <div className='flex items-ceter justify-center'>

      </div>
      <div className='w-full  flex items-center  justify-center  p-4'>
        <section className='max-w-7xl'>
          <div style={{ display: "" }}></div>

          <PageTitle title={<div className=''><span className='block leading-[55px]'>Festival de La Culture des iles Méditerranéees</span> <span className='block leading-[55px]'>(Edition {edition.year})</span></div>} />
          <p className='text-[24px] sm:text-[32px] text-[#0270A0] text-center font-semibold my-4'>{edition.name_en || edition.name_fr}</p>

          <PinnedImageSwap edition={edition} />


          <div className='flex justify-center flex-col items-center'>
            <Title size='text-[36px]'><span className='text-primary'>Programme</span> du Festival</Title>
            <div className='font-semibold'>Explorez les moments forts et les activités qui rythmeront cette édition unique du festival</div>
          </div>


          <div className="grid sm:grid-cols-3 items-center justify-center px-4 sm:px-0 mt-5">
            {edition?.events?.map((event, index) => (
              <EventsEditionCards key={index} event={event} />
            ))}
          </div>


          <hr className='border-t my-20 border-[#000000]' />

          <div className=' flex items-center justify-center'>
            <span className='text-[28px] sm:text-[36px] font-bold text-center'>
              <span className='text-[#0270A0]'>Soutiens</span> <span>Officiels de cette Edition</span>
            </span>
          </div>

          <div className='text-center text-[18px] sm:text-[20px] font-semibold leading-[30px] my-6'>
            <p>Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration</p>
            <p>rendent possible la célébration de notre patrimoine culturel, naturel et maritime</p>
            <p>Leur engagement est au soeur de la réussite de cette édition exceptionelle</p>
          </div>

          <div className='mt-12'>

            <Partners partners={edition.partners}/>
          </div>

          <div className=' text-center my-10'>
            <span className='text-[28px] sm:text-[36px] font-bold'>
              <span className='text-[#0270A0]'>Immersion Visuelle</span> <span>dans Nos Editions Passées</span>
            </span>
          </div>

          <div className='text-center text-[18px] sm:text-[20px] font-semibold leading-[30px] my-10'>
            <p>Reviver les momets les plus marquats des festivals précédets à traves une </p>
            <p>sélection captivante de photos et vidéos </p>
          </div>


          <Media edition={edition} />

          <hr className='mb-[50px] mt-[80px] border-black' />

          <div className='text-center mb-3'>
            <span className='text-[28px] sm:text-[36px] font-bold'>
              <span className='text-[#0270A0]'>Découvrez </span> <span>Nos Editions Precédetes </span>
            </span>
          </div>

          <div className='text-center text-[18px] sm:text-[20px] font-semibold leading-[30px] mt-5 mb-10 max-w-[876px] mx-auto'>

            <p>Plongez dans l'histoire et les moments marquants des festivales passés qui ont marqué Kerkenah</p>
          </div>

          <PastEditionsCarousel prevEditions={prevEditions} />


        </section>

      </div>

      <div className='flex items-center justify-center py-4'>
        <button className=" px-8 py-3 my-4 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-white font-bold rounded-full hover:shadow-lg ">
          Voir Toutes les Éditions Précédentes
        </button>
      </div>

    </div>
  )
}