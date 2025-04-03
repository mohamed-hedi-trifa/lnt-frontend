import React, { useRef, useEffect, useState } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import LocationIcon from "@/assets/icons/LocationIcon";
import FacebookIconType2 from "@/assets/icons/FacebookIconType2";
import LinkdinType2 from "@/assets/icons/LinkdinType2";
import XIconType2 from "@/assets/icons/XIconType2";
import MapPicker from "@/components/MapPicker";
import CopyIcon2 from "@/assets/icons/CopyIcon2";
import CopyToClipboard from "@/components/atoms/CopyToClipboard";
import LangLink from "@/components/LangLink";

const shareToFacebook = (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
const shareToTwitter = (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
const shareToLinkedIn = (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

export default function RightSideEventDetails({ event }: { event: any }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const baseUrl = process.env.GATSBY_APP_URL || "https://your-default-site.com";
  const fullUrl = `${baseUrl}${currentPath}`;

  const hasCoordinates = event?.latitude && event.longitude;
  const mapUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${event?.latitude},${event.longitude}`
    : "#";

  const [initialPosition, setInitialPosition] = useState<any>(null);

  useEffect(() => {
    if (event?.latitude != null && event?.longitude != null) {
      setInitialPosition([event?.latitude, event?.longitude]);
    }
  }, [event?.latitude, event?.longitude]);

  const handleSelectLocation = (lat:any, lng:any) => {
    return;
  };

  return (
    <div className="flex flex-col justify-start gap-2 items-start ">
      <div className="font-bold">Où se déroule l'événement ?</div>

      <div className="relative sm:justify-start  sm:items-start justify-center items-center ">
        {initialPosition ? (
          <MapPicker initialPosition={initialPosition} onSelectLocation={handleSelectLocation} role="view" />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex gap-2 font-semibold ${!hasCoordinates ? "pointer-events-none opacity-50" : ""}`}
        aria-disabled={!hasCoordinates}
      >
        <div className="flex gap-2 sm:justify-start items-center pt-2">
          <span className="text-[#0270A0]">
            <LocationIcon />
          </span>
          <span className="uppercases text-start text-sm font-medium">
            {event?.location_en || event?.location_fr}
          </span>
        </div>
      </a>

      <div className="font-bold text-start mt-2">
        Restez informé(e) des prochains événements !
      </div>

      {/* Lien vers le composant NewsLetterSub avec défilement fluide */}
      <AnchorLink to={`/event/event-details/${event.slug}/#Newsletter`} title="Abonnez-vous à notre Newsletter">
        <div className="text-[#0270A0] underline font-semibold">
          Abonnez-vous à notre Newsletter
        </div>
      </AnchorLink>

      <div className="font-bold text-start mt-2">
        Vous avez une question sur cet événement ?
      </div>
      <LangLink to="/contact" className="text-[#0270A0] underline font-semibold">
        Contactez-nous !
      </LangLink>

      <div className="font-bold text-start mt-2">Partager avec vos amis</div>
      <div className="flex gap-4">
        <Link to={shareToFacebook(fullUrl)} target="_blank" rel="noopener noreferrer">
          <FacebookIconType2 />
        </Link>

        <Link to={shareToLinkedIn(fullUrl)} target="_blank" rel="noopener noreferrer">
          <LinkdinType2 />
        </Link>

        <Link to={shareToTwitter(fullUrl)} target="_blank" rel="noopener noreferrer">
          <XIconType2 />
        </Link>

        <CopyToClipboard url={fullUrl}>
          <div className="bg-primary size-[33px] rounded-full shadow-helmi flex items-center justify-center">
            <CopyIcon2 />
          </div>
        </CopyToClipboard>
      </div>

      <div className="w-full flex justify-center">
        <button className="bg-[#0270A0] w-fit px-5 py-3 rounded-lg text-white font-semibold sm:hidden block mt-5">
          Ajouter à votre calendrier
        </button>
      </div>
    </div>
  );
}
