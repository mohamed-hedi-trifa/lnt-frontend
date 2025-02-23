import PageParagraph from "@/components/atoms/PageParagraph";
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
          
            <div className=" md:text-left mb-6 ">
          
              <PageParagraph fontWeight="normal" spacing="normal"> 
                 {description}
              </PageParagraph>
        </div>
          <div className="flex justify-start items-center">
          <img src={imageUrl} alt={title} className="w-full max-w-[600px] mx-auto h-auto shadow- rounded-[20px]"/>
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