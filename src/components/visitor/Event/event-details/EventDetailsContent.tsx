import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventDetailsContent.css";

import { navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import BlogList from "../../aire-marine/monitoring/marin/species/BlogList";

// Helper function to parse custom markdown-like syntax
const parseContent = (content: any) => {
  if (!content) return "";

  // Replace **bold** with <strong>bold</strong>
  const boldParsed = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Detect URLs and convert them to clickable links
  const linkParsed = boldParsed.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return linkParsed;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export default function EventDetailsContent({ location, params }: { location: any; params: any }) {
  const [event, setEvent] = useState<any>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [location]);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/events/${slug}`)
        .then((res) => {
          setEvent(res.data);

       
          const searchParams = new URLSearchParams(location.search);
          const urlLanguage = searchParams.get("lang");

          if (urlLanguage && res.data[`title_${urlLanguage}`]) {
            setLanguage(urlLanguage);
          } else {

            setLanguage(res.data.title_en ? "en" : "fr");
          }
        })
        .catch((err) => {
          console.error("Error fetching blog post:", err);
  
          navigate("/404");
        });
    }
  }, [slug, location.search]);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full px-8 text-start max-w-3xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>



        <div className="mt-4 flex flex-col">
          {event?.content_items
            ?.sort((a: any, b: any) => a.order - b.order)
            .map((item: any) => (
              <div key={item.id}>
                {item.language === language ? (
                  item.type === "title" ? (
                    <Title customClassName="mb-2">{item.content}</Title>
                  ) : item.type === "text" ? (
                    // Apply the markdown parser to the text content
                    <div
                      className="mb-4"
                      dangerouslySetInnerHTML={{
                        __html: parseContent(item.content),
                      }}
                    />
                  ) : item.type === "image" ? (
                    <div className="mb-2">
                      <img
                        src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                        alt=""
                      />
                    </div>
                  ) : item.type === "pdf" ? (
                    <div>
                      <a
                        download
                        href={`${process.env.GATSBY_API_URL}${item.file_path}`}
                      >
                        Download Pdf
                      </a>
                    </div>
                  ) : item.type === 'list' ? (
                    <div>
                        <BlogList content={item.content} />
                    </div>
               
                  ): null
                  
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
