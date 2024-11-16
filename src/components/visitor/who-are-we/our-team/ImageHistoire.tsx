import React, { useState } from "react";
import './ImageHistoire.css';
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const ImageHistoire = () => {
  const images = [
    { src: '/images/images_histoire/img1.png' },
    { src: '/images/images_histoire/img2.png' },
    { src: '/images/images_histoire/img3.png' },
    { src: '/images/images_histoire/img4.png' },

  ];

  const data = [
    {
      title: "Notre Histoire",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) test de mon application de test tester ces tedes de gout"
    },
    {
      title: "Principes et Valeurs",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) test de mon application de test tester ces tedes de gout"
    },
    {
      title: "Nos Réalisations",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) test de mon application de test tester ces tedes de gout"
    },
    {
      title: "Notre Équipe",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) test de mon application de test tester ces tedes de gout"
    },
    {
      title: "Partenaires",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) test de mon application de test tester ces tedes de gout"
    }
  ];

  return (
    <div className='images flex justify-center items-center flex-col'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div key={index} className="w-full rounded-[10px] relative group my-10">
            <img
              src={image.src}
              className=" object-cover rounded-[10px] w-[372px] h-[297px] lg:w-[450px] lg:h-[200px]"
              alt={`Image ${index + 1}`}
            />
            
            {/* Overlay */}
            <div className="absolute bottom-[px] inset-0 flex justify-center items-end pb-2 group-hover:flex ">
              <div className="bg-white bg-opacity-70 p-4 w-[90%] rounded-lg shadow-lg transition-all duration-500 ease-in-out overflow-hidden max-h-[82px] group-hover:max-h-[300px]">
                
                {/* Title: Always visible */}
                <h3 className="font-bold text-center text-[#0270A0] text-[30px]">{data[index]?.title}</h3>

                {/* Description: Initially hidden, revealed on hover */}
                <p className="text-sm text-center text-gray-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  {data[index]?.description}
                </p>

                {/* "Learn More" icon: Initially hidden, revealed on hover */}
                <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  <ChevronDoubleRightIcon
                    className="h-§ w-5"
                    style={{ color: '#0270A0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}


          
      </div>

      {/** **/}

      <div className="flex justify-center mt-6">
          <div key={4} className="w-full rounded-[10px] relative group col-span-2 flex items-end justify-end my-10">
            <img
              className=" object-cover rounded-[10px] w-full h-[297px] lg:w-[450px] lg:h-[200px] "

              src='/images/images_histoire/img5.png'
              alt={`Image ${4 + 1}`}
            />
            
            {/* Overlay */}
            <div className="absolute bottom-[px] inset-0 flex justify-center items-end pb-2 group-hover:flex ">
              <div className="bg-white bg-opacity-70 p-4 w-[90%] rounded-lg shadow-lg transition-all duration-500 ease-in-out overflow-hidden max-h-[82px] group-hover:max-h-[300px]">
                
                {/* Title: Always visible */}
                <h3 className="font-bold text-center text-[#0270A0] text-[30px]">{data[4]?.title}</h3>

                {/* Description: Initially hidden, revealed on hover */}
                <p className="text-sm text-center text-gray-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  {data[4]?.description}
                </p>

                {/* "Learn More" icon: Initially hidden, revealed on hover */}
                <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  <ChevronDoubleRightIcon
                  className="h-5 w-5"
                    style={{ color: '#0270A0' }}
                  />
                </div>
              </div>
            </div>
          </div>    
          <div></div> 
      </div>
      {/** **/}
      
    </div>
  );
};

export default ImageHistoire;
