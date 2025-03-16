import React from 'react'
import ImagesFestival from './ImagesFestival';

type NewType = {
    title: string;
    description: string;
    imageUrl: string; // Make sure each item in the images array has an imageUrl
    path: string;
};

interface ContainerImageFestival {
    images: NewType[];
}

const ContainerImageMarine: React.FC<ContainerImageFestival> = ({ images }) => {

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 '>
            {images.map((image, index) => (
                <ImagesFestival
                    key={index}
                    title={image.title}
                    description={image.description}
                    imageUrl={image.imageUrl}
                    path={image.path}
                />
            ))}
        </div>
    );
};

export default ContainerImageMarine;
