import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './services/ServiceCard';

interface Service {
    id: number;
    name: string;
    description: string;
    order: number;
    status: boolean;
}

const DICT: any = {
    en: {
        services: "Services en"
    },
    fr: {
        services: "Services fr"
    }
}

export default function ServicesVisitor({ lang }: { lang: string }) {

    const [loading, setLoading] = useState<boolean>(true);
    const [services, setServices] = useState<Service[]>([]); // Use Service interface

    function getServices() {
        axios.get("/api/services").then(res => {
            setServices(res.data.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getServices();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: Service) => (
                <ServiceCard key={service.id} name={service.name} description={service.description} />
            ))}
        </div>
    );
}
