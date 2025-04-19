import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import BlogList from "../../aire-marine/monitoring/marin/species/BlogList";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import PdfIcon from "@/assets/icons/PdfIcon.png";


const parseContent = (content: any) => {
    if (!content) return "";

    const boldParsed = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
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

export default function OpportunityDetailsContent({ location, params }: { location: any; params: any }) {
    const [opportunity, setEvent] = useState<any>(null);
    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        if (slug) {
            axios
                .get(`/api/opportunities/${slug}`)
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

    if (!opportunity) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <div className="w-full px-8 text-start max-w-3xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>



                <div className="mt-4 flex flex-col">
                    {opportunity?.content_items
                        ?.sort((a: any, b: any) => a.order - b.order)
                        .map((item: any) => (
                            <div key={item.id}>
                                {item.language === language ? (
                                    item.type === "title" ? (
                                        <Title customClassName="mb-2">{item.content}</Title>
                                    ) : item.type === "text" ? (
                                        <PageParagraph2>
                                            <div
                                                className="mb-4"
                                                dangerouslySetInnerHTML={{
                                                    __html: parseContent(item.content),
                                                }}
                                            />
                                         </PageParagraph2>
                                    ) : item.type === "image" ? (
                                        <div className="mb-2 flex justify-center">
                                            <img
                                                src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                                                alt=""
                                                className="w-full h-auto max-w-[600px] object-cover rounded-md shadow-lg"
                                            />
                                        </div>
                                    ) : item.type === "pdf" ? (
                                        <div>
                                            <a
                                                download
                                                href={`${process.env.GATSBY_API_URL}${item.file_path}`}
                                               
                                            >  
                                                <div className="mb-10 flex items-center">
                                                 <img className="h-16 w-[50px]" src={PdfIcon} alt="PDF Icon" />
                                                 <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">
                                                 {item.file_path.split('/').pop().split('5555_')[1]}
                                                    </p>
                                                </div>
                                                
                                            </a>
                                        </div>
                                    ) : null

                                ) : null}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
