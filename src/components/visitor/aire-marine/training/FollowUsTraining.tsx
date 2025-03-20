import React from 'react'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import { Link } from 'gatsby'
import NewsLetterSub2 from '@/components/NewsLetterSub2';
import XIcon from '@/assets/icons/XIcon'
import InstagramIcon from '@/assets/icons/InstagramIcon'
import YoutubeIcon from '@/assets/icons/YoutubeIcon'
import LinkedinIcon from '@/assets/icons/LinkedinIcon'
import Line from '@/components/atoms/Line';
export default function FollowUsTraining() {
  return (
    <div className='sm:w-[300px] float-end'>

      <div className="text-[#183354] text-start text-xl font-bold leading-relaxed pb-1">Suivez-nous</div>
            <Line />
      <div className={`flex flex-col gap-6 sm:sticky top-[116px] h-fit   mt-8`}>


        <div className='grid grid-cols-2 gap-1 sm:w-[300px]'>
            <Link to='https://www.facebook.com/AKDDCL' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl inline-flex items-center gap-[15px]">
              <div className='text-black'><FacebookIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">facebook</div>
            </Link>
            <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl inline-flex items-center gap-[15px]">
              <div className='text-black'><XIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">X</div>
            </Link>
            <Link to='https://www.instagram.com/akddcl.kerkennah/' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl inline-flex items-center gap-[15px]">
              <div className='text-black'><InstagramIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Instagram</div>
            </Link>
            <Link to='https://www.youtube.com/@AKDDCL-Kerkennah' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl inline-flex items-center gap-[15px]">
              <div className='text-black'><YoutubeIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Youtube</div>
            </Link>
            <Link to='https://www.linkedin.com/company/association-kratten-du-d%C3%A9veloppement-%C3%A9veloppement-durable-de-la-culture-et-du-loisir/' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl inline-flex items-center gap-[15px]">
              <div className='text-black'><LinkedinIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Linkedin</div>
            </Link>
        </div>
        
        <NewsLetterSub2 title="Restez Connectés !" paragraph="Inscrivez-vous à notre newsletter pour Recevez les infos sur nos prochaines formations et campements"/>
      </div>


    </div>
  )
}




