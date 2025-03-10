import { useLocation } from "@reach/router";
import ArrowBackIcon from '@/assets/icons/ArrowBackIcon';
import FacebookCircleIcon from '@/assets/icons/FacebookCircleIcon';
import InstagramCircleIcon from '@/assets/icons/InstagramCircleIcon';
import LinkedinCircleIcon from '@/assets/icons/LinkedinCircleIcon';
import ShareIcon from '@/assets/icons/ShareIcon'
import XCircleIcon from '@/assets/icons/XCircleIcon';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { Link } from 'gatsby';
import React, { useState } from 'react';
import CopyToClipboard from "@/components/atoms/CopyToClipboard";
import CopyIcon from "@/assets/icons/CopyIcon";

const shareToFacebook = (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
const shareToTwitter = (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
const shareToLinkedIn = (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current page path
  const currentPath = location.pathname; // Example: /our-festival/123
  const baseUrl = process.env.GATSBY_APP_URL || "https://your-default-site.com";
  const fullUrl = `${baseUrl}${currentPath}`; // Full URL including path

  return (
    <div className="h-full w-full absolute top-0 left-0">
      <div className="sticky top-0 h-screen flex items-center">
        <div className='h-[92px]'>
          <Accordion open={open} className='bg-[#000000B2] w-[65px] text-white rounded-r-[10px] !p-0 !m-0' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <AccordionHeader onClick={() => setOpen(!open)} className="flex justify-center bg-transparent border-none shadow-none w-auto !text-center !p-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {open ? (
                <button className="flex flex-col justify-center items-center py-5 z-50 !w-[65px] shrink-0">
                  <ArrowBackIcon />
                </button>
              ) : (
                <button className="flex flex-col items-center gap-2.5 pt-5 pb-4 z-50 w-[65px]">
                  <ShareIcon />
                  <div className="text-xs">partager</div>
                </button>
              )}
            </AccordionHeader>

            <AccordionBody className="p-0 text-white">
              <div className='p-2 flex flex-col items-center gap-5 bg-[#D3CACA] py-3'>
                <Link to={shareToFacebook(fullUrl)} target="_blank" rel="noopener noreferrer">
                  <FacebookCircleIcon width="30px" height="30px" />
                </Link>
                <Link to={shareToLinkedIn(fullUrl)} target="_blank" rel="noopener noreferrer">
                  <LinkedinCircleIcon width={30} height={30} />
                </Link>
                <Link to={shareToTwitter(fullUrl)} target="_blank" rel="noopener noreferrer">
                  <XCircleIcon width={30} height={30} />
                </Link>
                <CopyToClipboard url={fullUrl}>
                        <div className="size-[30px] bg-white rounded-full shadow-helmi flex items-center justify-center">
                        <CopyIcon />
                        </div>
                    </CopyToClipboard>
              </div>
              <div className='-rotate-90 mb-8 mt-[90px] text-[24px] font-bold text-nowrap'>
                Partager :
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
