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
      <div className="flex items-center justify-center ">
        <div className=" rounded-lg ">
            <div className="flex gap-2">
                <img src={titlesrc}/>
                <h2 className="text-xl font-bold mt-4">{title}</h2>
            </div>
          
            <div className="text-center md:text-left ">
            <p className=" text-justify descriptionText">
            Notre association, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), est profondément enracinée dans la préservation du patrimoine unique de Kerkennah et engagée dans le développement durable. Nos principes et valeurs guident chaque initiative, de la protection de l’environnement à l’inclusion sociale, et reflètent notre vision d’une communauté prospère et autonome.
            </p>
        </div>
          <div className="flex justify-center items-center">
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