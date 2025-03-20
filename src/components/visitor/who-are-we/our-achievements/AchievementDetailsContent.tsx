import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AchievementDetailsContent.css";

import { navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import BlogList from "../../aire-marine/monitoring/marin/species/BlogList";
import Calendar from "@/assets/icons/Calendar";
import Media from "../../Media";
import PageParagraph from "@/components/atoms/PageParagraph";
import PageParagraph2 from "@/components/atoms/PageParagraph2";

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

interface SectionHeaderProps {
  title: React.ReactNode;
}

const SectionHeader = ({ title}: SectionHeaderProps) => (
  <div className="flex flex-col items-center text-center justify-center py-10">
    <Title size="text-2xl sm:text-[36px] pb-4">{title}</Title>
  </div>
);
export default function AchievementDetailsContent({ location, params }: { location: any; params: any }) {
    const [achievement, setAchievement] = useState<any>(null);
    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        if (slug) {
            axios
                .get(`/api/achievements/${slug}`)
                .then((res) => {
                    setAchievement(res.data);


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

    if (!achievement) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <div className="w-full px-8 text-start max-w-3xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>

                <div className="flex flex-col gap-5">
                    <h2 className="text-[36px] font-semibold ">{achievement.title_en || achievement.title_fr}</h2>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        {achievement?.themes.length > 0 ? achievement?.themes?.map((item: any) =>
                            <div data-color="Primary" data-icon="None" data-size="md" data-style="Light" className="px-2.5 w-fit  py-1 bg-[#0270A0] rounded-md inline-flex justify-center items-center gap-4 shadow-lg">
                                <div className="justify-start text-white w-fit text-sm font-medium font-['Montserrat'] leading-tight">
                                    {item?.name_en || item?.name_fr}
                                </div>

                            </div>
                        ) :""}
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        <Calendar />
                        Le {new Date(achievement.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                    <img
                        src={`${process.env.GATSBY_API_URL}${achievement.image}`}
                        alt="achievement"
                        className="max-h-[500px] max-w-[800px] object-cover rounded-md shadow-lg"
                    />
                </div>


                <div className="mt-10 flex flex-col gap-1">
                    {achievement?.content_items
                        ?.sort((a: any, b: any) => a.order - b.order)
                        .map((item: any) => (
                            <div key={item.id}>
                                {item.language === language ? (
                                    item.type === "title" ? (
                                        <Title customClassName="mt-8" variant="pill" size="text-[24px]">{item.content} </Title>
                                    ) : item.type === "text" ? (
                                        <PageParagraph>

                                            <div
                                                className="mb-4 ml-6"
                                                dangerouslySetInnerHTML={{
                                                    __html: parseContent(item.content),
                                                }}
                                            />
                                        </PageParagraph>
                                    ) : item.type === "image" ? (
                                        <div className="mb-2 flex justify-center">
                                            <img
                                                src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                                                alt=""
                                                className="max-h-[500px] max-w-[600px] object-cover rounded-md shadow-lg"
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

                                    ) : null

                                ) : null}
                            </div>
                        ))}
                </div>
                <hr className="border-t border-black mt-10" />
                <SectionHeader 
                    title={<span><span className="text-[#0270A0]">Souvenirs</span> en Photos et Vidéos</span>}
                 />
                <div className="mb-20">
                    <Media mediaContent={achievement}  />
                </div>
            </div>
        </div>
    );
}
