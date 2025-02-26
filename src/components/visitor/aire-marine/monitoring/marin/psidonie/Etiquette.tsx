import React from "react";

interface Props{
    image  : string
    titre : string
    description : string,
    spacing?:string
}

const Etiquette:React.FC<Props>  = ({image,titre,description,spacing}) =>{
    return (
            <div className={`flex ${spacing}`}>
            <div className="w-[10%] flex items-center justify-center"><img src={image} alt="" /></div>
                <div className="w-[90%] p-2">
                    <div><span className="text-[20px] font-bold text-justify">{titre}</span></div>
                    <div><span className="text-[20px]">{description}</span></div>
                </div>
            </div>
               
    )
}

export default Etiquette