import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Breadcrumbs = ({ title }: { title?: string }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="overflow-hidden">
      <ul className="flex flex-wrap gap-2 text-lg items-center whitespace-nowrap">
        {/* Root Breadcrumb */}
        <li>
          <Link to="/" className="text-primary font-medium">
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumbs */}
        {segments.map((segment, index) => {
          const breadcrumbPath = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const formattedSegment = decodeURIComponent(segment).replace(/-/g, " ");
          const displayText = formattedSegment.length > 25 ? formattedSegment.slice(0, 25) + "..." : formattedSegment;

          return (
            <li key={breadcrumbPath} className="flex items-center whitespace-nowrap">
              <span className="mx-1 text-gray-400">{">"}</span>
              {!isLast ? (
                <Link to={breadcrumbPath} className="text-primary capitalize font-medium">
                  {displayText}
                </Link>
              ) : (
                <span className="text-[#525458] font-medium">{title || displayText}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

