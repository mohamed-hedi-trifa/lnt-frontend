import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import PdfIcon from "@/assets/icons/PdfIcon.png";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

export default function OpportunityDetailsContent({ location, params }: { location: any; params: any }) {
  const [opportunity, setOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug;
    setLoading(true);
    axios
      .get(`/api/opportunities/${slug}`)
      .then((r) => setOpportunity(r.data))
      .finally(() => setLoading(false));
  }, [location]);

  /* ---------- loader ---------- */
  if (loading)
    return (
      <div className="space-y-4">
        <Shimmer className="h-8 w-3/4" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Shimmer key={i} className="h-4 w-full" />
        ))}
      </div>
    );

  /* ---------- real content ---------- */
  const parse = (c: string) =>
    c.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>');

  return (
    <div className="w-full px-8 text-start max-w-3xl mx-auto">
      {opportunity.content_items
        ?.sort((a: any, b: any) => a.order - b.order)
        .map((item: any) => {
          if (item.type === "title") return <Title key={item.id} customClassName="pt-6">{item.content}</Title>;
          if (item.type === "text")
            return (
              <PageParagraph2 key={item.id}>
                <div dangerouslySetInnerHTML={{ __html: parse(item.content) }} />
              </PageParagraph2>
            );
          if (item.type === "image")
            return <img key={item.id} src={`${process.env.GATSBY_API_URL}${item.file_path}`} className="w-full max-w-[600px] mx-auto rounded-md shadow-lg my-4" />;
          if (item.type === "pdf")
            return (
              <a key={item.id} download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                <div className="flex items-center my-6">
                  <img src={PdfIcon} className="h-16 w-[50px]" />
                  <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">{item.file_path.split("/").pop()?.replace(/^.*?_/, "")}</p>
                </div>
              </a>
            );
          return null;
        })}
    </div>
  );
}
