import React from 'react';
import Card from '../../Card';

interface ServiceProps {
    name: string;
    description: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ name, description }) => {
    return (
        <Card title="">
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <p className="text-gray-700">{description}</p>
        </Card>
    );
}

export default ServiceCard;
