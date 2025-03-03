import React from 'react';

const gallery = [
  '/images/festival/gallery/Mask.png',
  '/images/festival/gallery/Mask-1.png',
  '/images/festival/gallery/Mask-2.png',
  '/images/festival/gallery/Mask-3.png',
  '/images/festival/gallery/Mask-4.png',
  '/images/festival/gallery/Mask-5.png',
  '/images/festival/gallery/Mask-6.png',
  '/images/festival/gallery/Mask-7.png',
  '/images/festival/gallery/Mask-8.png',
  '/images/festival/gallery/Mask-9.png',
  '/images/festival/gallery/Mask-10.png',

];

const GallerySection = () => {
  return (
    <div className=' w-full   relative '>
    <div className='abolute  left-0 w-1/2 h-full bg-[#0270A0]  '></div>

     
      <div className='w-[80%] h-[80%] bg-[#F1F0E8] p-4 absolute top-[100px] left-[100px] '>
     
       
       <div className='images grid grid-cols-3 gap-4 '>
            <div className='flex flex-col gap-2'>
                <img src={gallery[10]} alt="" />
                <img src={gallery[5]} alt="" />
                <img src={gallery[1]} alt="" />
            </div>
            <div className='flex flex-col gap-3'>
                <img src={gallery[9]} alt="" />
                <img src={gallery[7]} alt="" />
                <img src={gallery[4]} alt="" />
                <img src={gallery[0]} alt="" />

            </div>
            <div className='flex flex-col gap-3'>
                <img src={gallery[8]} alt="" />
                <img src={gallery[6]} alt="" />
                <img src={gallery[3]} alt="" />
                <img src={gallery[2]} alt="" />

            </div>
       </div>
      </div>
    </div>
  );
};

export default GallerySection;


// import React from 'react';

// const gallery = [
//   '/images/festival/gallery/Mask.png',
//   '/images/festival/gallery/Mask-1.png',
//   '/images/festival/gallery/Mask-2.png',
//   '/images/festival/gallery/Mask-3.png',
//   '/images/festival/gallery/Mask-4.png',
//   '/images/festival/gallery/Mask-5.png',
//   '/images/festival/gallery/Mask-6.png',
//   '/images/festival/gallery/Mask-7.png',
//   '/images/festival/gallery/Mask-8.png',
//   '/images/festival/gallery/Mask-9.png',
//   '/images/festival/gallery/Mask-10.png',

// ];

// const GallerySection = () => {
//   return (
//     <div className=' w-full   relative '>
//     <div className='abolute  left-0 w-1/2 h-full bg-[#0270A0]  '></div>

     
//       <div className='w-[80%] h-[80%] bg-[#F1F0E8] p-4 absolute top-[100px] left-[100px] '>
     
       
//        <div className='images grid grid-cols-3 gap-4 '>
//             <div className='flex flex-col gap-2'>
//                 <img src={gallery[10]} alt="" />
//                 <img src={gallery[5]} alt="" />
//                 <img src={gallery[1]} alt="" />
//             </div>
//             <div className='flex flex-col gap-3'>
//                 <img src={gallery[9]} alt="" />
//                 <img src={gallery[7]} alt="" />
//                 <img src={gallery[4]} alt="" />
//                 <img src={gallery[0]} alt="" />

//             </div>
//             <div className='flex flex-col gap-3'>
//                 <img src={gallery[8]} alt="" />
//                 <img src={gallery[6]} alt="" />
//                 <img src={gallery[3]} alt="" />
//                 <img src={gallery[2]} alt="" />

//             </div>
//        </div>
//       </div>
//     </div>
//   );
// };

// export default GallerySection;
