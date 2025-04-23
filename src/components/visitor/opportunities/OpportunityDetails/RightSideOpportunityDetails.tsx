import React, { useEffect, useState } from 'react'
import { Link } from "gatsby";
import axios from "axios";
import FacebookIconType2 from '@/assets/icons/FacebookIconType2';
import LinkdinType2 from '@/assets/icons/LinkdinType2';
import XIconType2 from '@/assets/icons/XIconType2';
import CopyIcon2 from "@/assets/icons/CopyIcon2";
import CopyToClipboard from "@/components/atoms/CopyToClipboard";
import LangLink from "@/components/LangLink";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import RelatedBlog from '../../news/RelatedBlog';

const shareToFacebook = (url: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
const shareToTwitter = (url: string) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
const shareToLinkedIn = (url: string) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
export default function RightSideOpportunityDetails({ opportunity, language, params }: { opportunity: any, language: string, params: any }) {

  function formatDateToMonthYear(date: Date | string | undefined): string {
    if (!date) {
      return "Date non spécifiée"; // Handle undefined or null dates
    }

    const dateObj = new Date(date); // Convert to Date object
    if (isNaN(dateObj.getTime())) {
      return "Date invalide"; // Handle invalid dates
    }

    const monthNames = {
      fr: [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ],
      en: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    };

    const month = monthNames[language as keyof typeof monthNames][dateObj.getMonth()];  // Get the month name
    const year = dateObj.getFullYear();

    return `${month} ${year}`;
  }
  const currentPath = location.pathname;
  const baseUrl = process.env.GATSBY_APP_URL || "https://your-default-site.com";
  const fullUrl = `${baseUrl}${currentPath}`;

  const [relatedOpportunity, setRelatedOpportunisty] = useState([]);
  const getRelatedOpportunity = async (slugNews: string) => {
    try {
      const response = await axios.get(`/api/related-opportunities/${slugNews}`);
      setRelatedOpportunisty(response.data);
    } catch (error) {
      console.error("Error fetching news types:", error);
    }
  };
  useEffect(() => {
    const slugOpportunity = params.slug;
    getRelatedOpportunity(slugOpportunity)

  }, [location]);

  return (
    <div className='flex flex-col justify-start gap-2 items-start'>
      <div className='flex flex-col justify-start gap-2 items-start'>
        <div className="font-bold text-start">
          Détails du Poste
        </div>
        <div className="flex gap-2 items-center">
          <img src="/icons/locationIcon.png" alt="" width={22} />
          <p className='text-[13px]'>
            <span className='font-semibold'>Lieu : </span>
            {opportunity.location_en || opportunity.location_fr}
          </p>
        </div>

        {opportunity.contract_type && (
          <div className="flex gap-2 items-center text-start">
            <img src="/icons/contract.png" alt="" width={22} />
            <p className="text-[13px]">
              <span className="font-semibold">Type de contrat :</span> {opportunity.contract_type}
            </p>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <img src="/icons/startDateIcon.png" alt="" width={22} />
          <p className='text-[13px]'>
            <span className='font-semibold'>Date limite pour postuler : </span>
            {opportunity.due_date}
          </p>
        </div>

        {
          opportunity.type !== "call-for-tender" && (
            <div className="flex gap-2 items-center">
              <img src="/icons/calendrier.png" alt="" width={22} />
              <p className='text-[13px]'>
                <span className='font-semibold'>Début du poste : </span>
                {formatDateToMonthYear(opportunity.postStart)}
              </p>
            </div>
          )
        }

      </div>

      <div className="font-bold text-start mt-2">
        Restez informé(e) des prochains opportunities !
      </div>
      <AnchorLink
        to={`/opportunities/opportunity-details/${opportunity.slug}/#Newsletter`}
        title="Abonnez-vous à notre Newsletter"
      >
        <div className="text-[#0270A0] underline font-semibold">
          Abonnez-vous à notre Newsletter
        </div>
      </AnchorLink>
      <div className="font-bold text-start mt-2">
        Vous avez une question sur cet opportunitie ?
      </div>
      <LangLink to="/contact" className="text-[#0270A0] underline font-semibold">
        Contactez-nous !
      </LangLink>
      <div className="font-bold text-start mt-2">Partager avec vos amis</div>
      <div className="flex gap-4">
        <Link
          to={shareToFacebook(fullUrl)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIconType2 />
        </Link>
        <Link
          to={shareToLinkedIn(fullUrl)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkdinType2 />
        </Link>
        <Link
          to={shareToTwitter(fullUrl)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIconType2 />
        </Link>
        <CopyToClipboard url={fullUrl}>
          <div className="bg-primary size-[33px] rounded-full shadow-helmi flex items-center justify-center">
            <CopyIcon2 />
          </div>
        </CopyToClipboard>
      </div>
      <div className='mt-5'>
        {relatedOpportunity.length > 0 && (
          <RelatedBlog relatedBlog={relatedOpportunity} headerName="Opportunities Connexes" route="/opportunities/opportunity-details/" />
        )}
      </div>





    </div>
  );
}