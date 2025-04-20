import React, { useState, useEffect } from "react";
import axios from "axios";
import OpportunityDetailsImage from "./OpportunityDetailsImage";
import RightSideOpportunityDetails from "./RightSideOpportunityDetails";
import OpportunityDetailsContent from "./OpportunityDetailsContent";
import OtherOppertunities from "./OtherOppertunities";
import JobOfferModal from "../JobOfferModal";
import CallForTrenderModal from "../CallForTrenderModal";
import InternshipApplicationFormModal from "../InternshipApplicationFormModal";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

const ImageSkeleton = () => <Shimmer className="w-full h-[450px]" />;
const SideSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Shimmer className="h-5 w-44" />
    {Array.from({ length: 4 }).map((_, i) => (
      <Shimmer key={i} className="h-4 w-60" />
    ))}
  </div>
);

/* ---------- main component ---------- */
export default function OpportunityDetails({ location, params }: { location: any; params: any }) {
  const [modalShow, setModalShow] = useState(false);
  const [opportunity, setOpportunity] = useState<any>(null);
  const [moreOpportunities, setMoreOpportunities] = useState<any[]>([]);
  const [loadingOpp, setLoadingOpp] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);

  /* fetch single opportunity */
  useEffect(() => {
    const slug = params.slug;
    setLoadingOpp(true);
    axios
      .get(`/api/opportunities/${slug}`)
      .then((r) => setOpportunity(r.data))
      .finally(() => setLoadingOpp(false));
  }, [location]);

  /* fetch related opportunities */
  useEffect(() => {
    const slug = params.slug;
    setLoadingMore(true);
    axios
      .get(`/api/more-opportunities/${slug}`)
      .then((r) => setMoreOpportunities(r.data))
      .finally(() => setLoadingMore(false));
  }, [location]);

  const lang = new URLSearchParams(location.search).get("lang") === "fr" ? "fr" : "en";

  return (
    <main className="relative">
      {/* ---------- header image ---------- */}
      {loadingOpp ? <ImageSkeleton /> : <OpportunityDetailsImage opportunity={opportunity} />}

      {/* ---------- body ---------- */}
      <section className="flex sm:gap-20 gap-12 flex-col sm:grid sm:grid-cols-3 my-5 max-w-7xl mx-auto sm:mt-20 mt-10 px-5">
        {/* ----- left/content ----- */}
        <div className="sm:col-span-2">
          {loadingOpp ? (
            <div className="space-y-4">
              <Shimmer className="h-8 w-3/4" />
              {Array.from({ length: 6 }).map((_, i) => (
                <Shimmer key={i} className="h-4 w-full" />
              ))}
            </div>
          ) : (
            <OpportunityDetailsContent location={location} params={params} />
          )}
        </div>

        {/* ----- right/sidebar ----- */}
        <div className="sm:col-span-1">
          {loadingOpp ? <SideSkeleton /> : <RightSideOpportunityDetails opportunity={opportunity} language={lang} params={params} />}
        </div>
      </section>

      {/* ---------- apply button & modals ---------- */}
      {!loadingOpp && (
        <>
          <div className="text-center mt-5">
            <button className="bg-[#006E9F] px-7 py-2 rounded-lg text-white font-semibold shadow-lg" onClick={() => setModalShow(true)}>
              Postuler Maintenant
            </button>
          </div>
          {opportunity.type === "job-offer" && <JobOfferModal show={modalShow} hide={() => setModalShow(false)} opportunityId={opportunity.id} />}
          {opportunity.type === "call-for-tender" && <CallForTrenderModal show={modalShow} hide={() => setModalShow(false)} opportunityId={opportunity.id} />}
          {opportunity.type === "internship" && <InternshipApplicationFormModal show={modalShow} hide={() => setModalShow(false)} opportunityId={opportunity.id} />}
        </>
      )}

      {/* ---------- related opportunities ---------- */}
      <section className="max-w-7xl mx-auto px-5 my-10">
        <hr className="border-black" />
        <OtherOppertunities moreOpportunities={moreOpportunities} loading={loadingMore} />
      </section>
    </main>
  );
}
