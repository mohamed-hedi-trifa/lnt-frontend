import React from "react";

// Define the props interface for the Principe component
interface ValueProps {
  title: string;
  description: string;
  imageUrl: string;
  titlesrc: string;
}

const Value: React.FC<ValueProps> = ({ title, description, imageUrl,titlesrc }) => {
  return (
    <div className="flex flex-col">
         <div className="flex items-center justify-center ">
         </div>
      <div className="flex items-center justify-start ">
        <div className=" rounded-lg ">
            <div className="flex items-center gap-2 ">
                <img src={titlesrc}/>
                <span className="text-[24px] sm:text-[30px] font-bold">{title}</span>
            </div>
          
            <div className=" md:text-left  w-[372px] lg:w-[650px]">
            <p className=" text-justify">
            {description}
            </p>
        </div>
          <div className="flex justify-start items-center">
          <img src={imageUrl} alt={title} className="lg:w-[650px] lg:h-[433px] w-[372px] h-[248px] object-cover rounded-lg mt-4 "/>
          </div>
        </div>
      </div>
     
      <div className="flex items-center justify-center">
        <div></div>
      </div>
    </div>
  );
};

export default Value;