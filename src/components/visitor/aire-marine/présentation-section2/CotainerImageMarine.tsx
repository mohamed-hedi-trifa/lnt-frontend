import React from 'react'
import ImageAireMarine from './image-aire-marine';

type NewType = {
    title: string;
    description: string;
    imageUrl: string; // Make sure each item in the images array has an imageUrl
};

interface ContainerImageMarineProps {
    images: NewType[];
}

const ContainerImageMarine: React.FC<ContainerImageMarineProps> = ({ images }) => {

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
            {images.map((image, index) => (
                <ImageAireMarine
                    key={index}
                    title={image.title}
                    description={image.description}
                    imageUrl={image.imageUrl} // Pass the imageUrl prop to the ImageAireMarine component
                />
            ))}
        </div>
    );
};

export default ContainerImageMarine;
