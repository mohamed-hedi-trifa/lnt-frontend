import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Heroicons v2
import PageParagraph from "./atoms/PageParagraph";

const Breadcrumbs = ({ title }: { title?: string }) => {
  const location = useLocation();
  const pathname = location.pathname; // e.g. "/en/protected-air-marine-coastal-areas/training"
  const segments = pathname.split("/").filter(Boolean);
  // e.g. ["en", "protected-air-marine-coastal-areas", "training"]

  // Check if the first segment is a known language code
  const languageCodes = ["en", "fr"];
  const hasLangPrefix = languageCodes.includes(segments[0]);
  // e.g. true if segments[0] is "en" or "fr"

  // Keep the prefix for links, but remove it for display
  const displaySegments = hasLangPrefix ? segments.slice(1) : segments;
  // e.g. ["protected-air-marine-coastal-areas", "training"]

  return (
    <nav className="overflow-hidden ">
      {/*flex items-center w-fit mx-auto sm:mx-10 rounded-b-lg h-[50px] md:h-[60px] px-3 md:px-6 bg-[linear-gradient(to_right,rgba(0,110,159),rgba(81,173,198))] shadow-lg*/}
      <ul className="flex items-center gap-2 flex-wrap whitespace-nowrap sm:ml-10 ml-3">
        {/* Root breadcrumb with Home icon */}
        <li className="flex items-center gap-1">
          <Link
            to={hasLangPrefix ? `/${segments[0]}` : "/"}
            className="flex items-center gap-1 text-primary font-medium"
          >
            <HomeIcon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Dynamic breadcrumbs */}
        {displaySegments.map((segment, index) => {
          // Build the link path including the language code if it exists
          const offset = hasLangPrefix ? 1 : 0;
          const breadcrumbPath = "/" + segments.slice(0, index + offset + 1).join("/");

          const isLast = index === displaySegments.length - 1;
          const formattedSegment = decodeURIComponent(segment).replace(/-/g, " ");
          const displayText =
            formattedSegment.length > 25 ? formattedSegment.slice(0, 25) + "..." : formattedSegment;

          return (
            <li key={breadcrumbPath} className="flex items-center gap-1">
              <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-900" aria-hidden="true" />
              {isLast ? (
               <PageParagraph>
                  <span className="text-gray-900 font-medium text-sm md:text-base">
                  {title || displayText}
                </span>
               </PageParagraph> 
              ) : (
                <PageParagraph>
                <Link
                  to={breadcrumbPath}
                  className="text-primary capitalize font-medium text-sm md:text-base"
                >
                  {displayText}
                </Link>
                </PageParagraph>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
