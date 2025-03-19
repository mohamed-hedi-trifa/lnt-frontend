import React from 'react'
import UpcomingEdition from './UpcomingEdition';

type NewType = {
    title: string;
    description: string;
    imageUrl: string;
    path: string;
};

interface ContainerImageUpcomingEditionProps {
    images: NewType[];
}

const ContainerImageUpcomingEdition: React.FC<ContainerImageUpcomingEditionProps> = ({ images }) => {

    return (
        <div className='flex justify-center'>
            {images.map((image, index) => (
                <UpcomingEdition
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

export default ContainerImageUpcomingEdition;
