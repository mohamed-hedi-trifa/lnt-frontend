import React from 'react'
import HeaderSection from './HeaderSection'

export default function FollowUs() {
  return (
    <div className=''>
      <HeaderSection headerName="Suivez-nous" />
      <div className="grid grid-cols-2 gap-2 mt-10">
        <button className="flex items-center gap-2 bg-gray-200 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition">
          <FacebookIcon />
          <span>Facebook</span>
        </button>

        <button className="flex items-center gap-2 bg-gray-200 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition">
          <XIcon />
          <span>X</span>
        </button>


        <button className="flex items-center gap-2 bg-gray-200 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition">
          <InstagramIcon />
          <span>Instagram</span>
        </button>

        <button className="flex items-center gap-2 bg-gray-200 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition">
          <YouTubeIcon />
          <span>Youtube</span>
        </button>

        <button className="flex items-center gap-2 bg-gray-200 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition">
          <LinkedInIcon />
          <span>Linkdin</span>
        </button>

      </div>


      <div className="relative flex flex-col items-center py-12 px-8 text-white w-full h-96 mt-10 rounded-xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] overflow-hidden">
  
  
  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-20">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="90" height="90">
      <path d="M2 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H2zm0 2h20v3.72L12 13 2 9.72V6zm0 5.28L7.88 12 2 14.72V11.28zm22 0v3.44L16.12 12 24 9.72V11.28zM12 14l10-4.28V18H2v-8.28L12 14z" />
    </svg>
  </div>


  <div className="relative flex flex-col items-center gap-5 z-10 text-center">
    <h1 className="font-bold text-3xl">Ne Manquez Rien !</h1>
    <p className="text-lg px-6 font-medium">
      Inscrivez-vous à notre Newsletter pour recevoir toutes les actualités
    </p>
    <input
      type="email"
      placeholder="E-mail"
      className="px-4 py-4 text-black rounded-md w-full max-w-md text-center text-lg outline-none focus:ring-2 focus:ring-white"
    />
    <button className="text-white font-semibold px-6 rounded-md bg-gradient-to-r from-[#006E9F] to-[#51ADC6] w-full max-w-md py-4 hover:opacity-90 transition">
      S'ABONNER
    </button>
  </div>

</div>




    </div>
  )
}

export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width={20} height={20} {...props}>
    <path d="M279.14 288l14.22-92.66h-88.91V132.3c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.12 44.38-121.12 124.72v70.62H22.89V288h81.35v224h100.17V288z" />
  </svg>
);

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={20} height={20} {...props}>
    <path d="M437.3 32H362.6L234.2 207.3 116.1 32H10.92L191.2 288 10.92 480H85.48L217.9 319.1 341.9 480h105.3L256.8 255.8 437.3 32z" />
  </svg>
);

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20} {...props}>
    <path d="M224.1 141c-63.6 0-115.1 51.5-115.1 115.1s51.5 115.1 115.1 115.1 115.1-51.5 115.1-115.1S287.6 141 224.1 141zm0 190.4c-41.6 0-75.3-33.7-75.3-75.3s33.7-75.3 75.3-75.3 75.3 33.7 75.3 75.3-33.7 75.3-75.3 75.3zm146.4-194.3c0 14.1-11.4 25.5-25.5 25.5s-25.5-11.4-25.5-25.5 11.4-25.5 25.5-25.5 25.5 11.4 25.5 25.5zm76.1 25.5c-1.7-36.3-9.9-68.4-36.3-94.8s-58.6-34.6-94.8-36.3c-37.4-2.1-149.4-2.1-186.8 0-36.3 1.7-68.4 9.9-94.8 36.3s-34.6 58.6-36.3 94.8c-2.1 37.4-2.1 149.4 0 186.8 1.7 36.3 9.9 68.4 36.3 94.8s58.6 34.6 94.8 36.3c37.4 2.1 149.4 2.1 186.8 0 36.3-1.7 68.4-9.9 94.8-36.3s34.6-58.6 36.3-94.8c2.1-37.4 2.1-149.4 0-186.8zm-43.3 224.3c-7.8 19.7-23.1 35-42.8 42.8-29.6 11.8-99.9 9.1-132.3 9.1s-102.7 2.7-132.3-9.1c-19.7-7.8-35-23.1-42.8-42.8-11.8-29.6-9.1-99.9-9.1-132.3s-2.7-102.7 9.1-132.3c7.8-19.7 23.1-35 42.8-42.8 29.6-11.8 99.9-9.1 132.3-9.1s102.7-2.7 132.3 9.1c19.7 7.8 35 23.1 42.8 42.8 11.8 29.6 9.1 99.9 9.1 132.3s2.7 102.7-9.1 132.3z" />
  </svg>
);

export const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width={20} height={20} {...props}>
    <path d="M549.7 124.1c-6.3-23.8-24.9-42.4-48.7-48.7C456.5 64 288 64 288 64s-168.5 0-213 11.4c-23.8 6.3-42.4 24.9-48.7 48.7C16 168.5 16 256 16 256s0 87.5 11.4 131.9c6.3 23.8 24.9 42.4 48.7 48.7C119.5 448 288 448 288 448s168.5 0 213-11.4c23.8-6.3 42.4-24.9 48.7-48.7C560 343.5 560 256 560 256s0-87.5-11.4-131.9zM232 336V176l144 80-144 80z" />
  </svg>
);

export const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20} {...props}>
    <path d="M100.3 448H7V148.9h93.3V448zM53.7 108.1C24.1 108.1 0 83.5 0 53.9 0 24.4 24.1 0 53.7 0s53.7 24.4 53.7 53.9c-.1 29.6-24.1 54.2-53.7 54.2zM447.9 448h-93.3V302.4c0-34.7-12.3-58.4-43.1-58.4-23.5 0-37.4 15.8-43.5 31.1-2.2 5.5-2.7 13.1-2.7 20.7V448h-93.3s1.2-248.5 0-299.1h93.3v42.4c-1 1.5-2.3 3.1-3.4 4.6h3.4v-4.6c12.4-19 34.7-46 84.3-46 61.4 0 107.3 39.6 107.3 124.8V448z" />
  </svg>
);



