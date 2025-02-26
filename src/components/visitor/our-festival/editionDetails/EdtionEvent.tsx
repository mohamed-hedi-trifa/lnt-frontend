import SquareIcon from '@/assets/icons/SquareIcon';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditionEventImages from './EditionEventImages';

const EdtionEvent = ({ event }: { event: any }) => {
    const [media, setMedia] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 


    const fetchGallery = async () => {
        try {
            const res = await axios.get(`/api/previous-event/${event.slug}`);
            setMedia(res.data.media); 
            console.log(media)
        } catch (err) {
            setError(err.message); 
            console.error('Failed to fetch gallery:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, [event.id]); // Re-fetch if event.id changes

    // Format date in French
    const formatFrenchDate = (dateString) => {
        if (!dateString) return 'Date non disponible'; // Handle missing date

        const date = new Date(dateString.replace(' ', 'T'));

        if (isNaN(date.getTime())) {
            return 'Date invalide'; // Handle invalid date
        }

        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
        ];

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const daySuffix = dayOfMonth === 1 ? 'er' : '';

        return `${dayOfWeek} ${dayOfMonth}${daySuffix} ${month} ${year}, ${hours}:${minutes}`;
    };

    const randomId = Math.floor(Math.random() * 10000000) + 1;

    return (
        <div>
            <div className="flex justify-between gap-2 items-center w-full">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <SquareIcon />
                        <h1 className="font-bold">{event.name_en || event.name_fr}</h1>
                    </div>

                    <p className="text-start">{event.description_en || event.description_fr}</p>

                    <div className="flex font-semibold gap-2">
                        <span className="text-[#0270A0]">Lieu:</span>
                        {event.place_en || event.place_fr}
                    </div>

                    <div className="flex font-semibold gap-2">
                        <span className="text-[#0270A0]">Date:</span>
                        {formatFrenchDate(event.date)}
                    </div>
                </div>

                {/* Display gallery if data is available */}
                {!loading && !error && media.length > 0 && (
                    
                
                    <EditionEventImages media={media} id={`swiper-${randomId}`} />
                  
                )}

                {/* Display error message if fetch fails */}
                {error && <p className="text-red-500">Erreur lors du chargement de la galerie.</p>}

                {/* Display loading state */}
                {loading && <p>Chargement de la galerie...</p>}
            </div>
        </div>
    );
};

export default EdtionEvent;