import React from "react";

type Research = {
  image?: string;
  title?: string;
};

export default function ResearchCard({ image, title }: Research) {
  return (
    <div>
      <div className="w-full aspect-square max-w-[150px] md:max-w-[225px] mx-auto">
        <img className="w-full h-full rounded-full shadow-helmi object-cover" src={image} alt={title} />
      </div>
      <div className="relative mt-4">
        <h3 className="mx-auto bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-xl md:text-3xl font-bold text-transparent bg-clip-text text-center">
          {title}
        </h3>
        <div className="absolute inset-0 z-[-1]">
          <h3 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text text-center" style={{ textShadow: "0px 3px 3px rgb(0,0,0,.3)" }}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
