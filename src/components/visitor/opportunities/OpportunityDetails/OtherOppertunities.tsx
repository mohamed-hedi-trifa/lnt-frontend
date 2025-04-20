import React from "react";
import LangLink from "@/components/LangLink";
import Title from "@/components/atoms/titles/Title";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import OpportunityCard from "../OpportunityCard";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

const SkeletonCard = () => <Shimmer className="rounded-xl sm:w-[300px] w-[350px] sm:h-[420px] h-[420px]" />;

export default function OtherOppertunities({ moreOpportunities, loading }: { moreOpportunities: any[]; loading: boolean }) {
  return (
    <div>
      <div className="flex flex-col items-center text-center justify-center py-10">
        <Title size="text-2xl sm:text-[36px]" className="pb-4">
          <span className="text-primary">Découvrez</span> d'autres Opportunités
        </Title>
        <PageParagraph2>
          <p className="font-semibold text-lg sm:text-[20px] max-w-3xl mx-auto">
            Explorez nos autres offres et trouvez l'opportunité qui correspond à vos aspirations
          </p>
        </PageParagraph2>
      </div>

      <div className="flex justify-center gap-9 pb-10 sm:px-0 px-5 flex-col sm:flex-row">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : moreOpportunities.map((o) => <OpportunityCard key={o.id} opportunity={o} />)}
      </div>

      <LangLink to="/opportunities" className="flex justify-center">
        <button className=" px-8 py-3 my-4 bg-gradient-to-r from-[#006E9F] via-[#51ADC6] to-[#006E9F] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right text-white font-bold rounded-full shadow-md">
          Voir Toutes les Opportunités
        </button>
      </LangLink>
    </div>
  );
}
