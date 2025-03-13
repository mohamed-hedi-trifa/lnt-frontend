import React, { useEffect, useState } from 'react'
import LocationMap from '../../LocationMap'
import LocationIcon from '@/assets/icons/LocationIcon'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import FacebookIconType2 from '@/assets/icons/FacebookIconType2'
import InstagramIconType2 from '@/assets/icons/InstagramIconType2'
import LinkdinType2 from '@/assets/icons/LinkdinType2'
import XIconType2 from '@/assets/icons/XIconType2'
import MapPicker from '@/components/MapPicker'

export default function RightSideEventDetails({event} : {event:any}) {

    const [initialPosition, setInitialPosition] = useState([36.8065, 10.1815]); // Default: Tunis coordinates

    useEffect(() => {
      if (event?.latitude != null && event?.longitude != null) {
        setInitialPosition([event.latitude, event.longitude]);
      }
    }, [event?.latitude, event?.longitude]);
    const handleSelectLocation = (lat, lng) => {
      return
      };

    return (
        <div className='flex flex-col justify-start gap-2 items-start'>
            <div className="font-bold ">
                Où se déroule l'événement ?
                
            </div>
           
           <div className='relative'>
           <MapPicker initialPosition={initialPosition} onSelectLocation={handleSelectLocation} role="view" />
    
           </div>
    
            
            
            <div className="flex gap-2 sm:justify-start items-center ">
                <span className='text-[#0270A0]'> <LocationIcon /></span>
                <span className="uppercases text-start  text-xs">Port de pêche de Kraten, Kerkennah</span>
            </div>

            <div className="font-bold text-start mt-2">
                Restez informé(e) des prochains événements !
            </div>
            <div className="text-[#0270A0] underline font-semibold">
            Abonnez-vous à notre Newsletter
            </div>
            <div className="font-bold text-start mt-2">
            Vous avez une question sur cet événement ? 
            </div>
            
            <div className="text-[#0270A0] underline font-semibold">
            Contactez-nous !
            </div>

            <div className="font-bold text-start mt-2">
            Partager avec vos amis
            </div>
            <div className="flex gap-2">
                 <FacebookIconType2/>
                <InstagramIconType2/>
                <LinkdinType2/>
                <XIconType2 />
            </div>

            <div className=' w-full flex justify-center'>
            <button className="bg-[#0270A0] w-fit px-5 py-3  rounded-lg text-white font-semibold sm:hidden block mt-5">Ajouter à votre calendrier</button>

            </div>
        </div>

    )
}
