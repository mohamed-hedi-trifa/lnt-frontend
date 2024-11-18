import React from "react";
const Partners: React.FC = () => {
    
    const images = Array.from({ length: 6 }, (_, index) => `part${index + 1}.png`);
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            
            {images.map((image, index) => (
                <div className="border-[#E8E8EA] border-[1.5px] p-4 box-border rounded-[30px] shadow-[0px_4px_4px_0px_#00000040] flex justify-center">
                    <img
                        key={index}
                        className="h-[150px] object-contain"
                        src={`/images/partener_images/${image}`}
                        alt={`Partner ${index + 1}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default Partners;
