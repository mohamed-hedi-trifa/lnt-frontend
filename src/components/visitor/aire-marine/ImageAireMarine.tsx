import React from 'react';

interface ImageAireMarineProps {
    title: string;
    description: string;
    imageUrl: string;
}

const ImageAireMarine: React.FC<ImageAireMarineProps> = ({ title, description, imageUrl }) => {
    return (
        <div
            className=" w-[355px] lg:w-full max-w-[616px] h-[320px] md:h-[297px] relative bg-cover rounded-[15px] flex items-center justify-center transition-all duration-500 group"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            
            <div className='h-full w-full absolute group-hover:bg-[rgba(0,0,0,0.4)] rounded-[15px]'></div>

            <div className="text-white flex flex-col md:flex items-start justify-center gap-4 sm:gap-6 px-4 sm:px-6 relative">
                <div className="transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-5 flex flex-col gap-6">
                    <p className="font-bold text-[20px] sm:text-[30px] transition-all">
                        {title}
                    </p>
                    <p className="text-sm font-semibold text-[18px] sm:text-[28px] leading-[20px] sm:leading-[28px] md:leading-[32px] transition-all">
                        {description}
                    </p>
                </div>
                <div className="images">
                    <div
                        className="justify-center overflow-hidden absolute top-16 md:top-20  right-4  bottom-20 md:right-10  w-[100px] h-[0px] group-hover:h-[100px] duration-300"
                        style={{
                            transition: 'height 2s',
                        }}
                    >
                        <img
                            src="/images/aire_marines/arrow.svg"
                            alt=""
                            className="absolute scale-110 md:scale-150 md:top-4 right-0 md:right-2 "
                            />
                    </div>
                    {/* Image becomes visible after height transition */}
                  
                </div>
            </div>
            <div
                        className="absolute right-2 bottom-2 md:right-8 md:bottom-8  scale-110 md:scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    >
                        <img
                            src="/images/aire_marines/button.svg"
                            alt=""
                            className="w-full h-auto "
                        />
            </div>
        </div>
    );
};

export default ImageAireMarine;
