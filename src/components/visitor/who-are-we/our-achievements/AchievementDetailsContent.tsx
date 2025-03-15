import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AchievementDetailsContent.css";

import { navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import BlogList from "../../aire-marine/monitoring/marin/species/BlogList";
import Calendar from "@/assets/icons/Calendar";
import Media from "../../Media";

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
                        {achievement.themes?.map((item: any) =>
                            <div data-color="Primary" data-icon="None" data-size="md" data-style="Light" className="px-2.5 w-fit  py-1 bg-[#0270A0] rounded-md inline-flex justify-center items-center gap-4">
                                <div className="justify-start text-white w-fit text-sm font-medium font-['Montserrat'] leading-tight">
                                    {item?.name_en || item?.name_fr}
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        <Calendar />
                        Le {new Date(achievement.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                </div>


                <div className="mt-10 flex flex-col">
                    {achievement?.content_items
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

                                    ) : null

                                ) : null}
                            </div>
                        ))}
                </div>
                <hr className="border-black mx-7 my-[32px]" />
                <Title customClassName="!font-bold hidden lg:block" size="!text-[32px]">
                    <span className="text-primary">Souvenirs</span> en Photos et Vidéos
                </Title>
                <Title customClassName="!font-bold block lg:hidden" size="!text-[28px]">
                    <div className="flex flex-col">
                        <div className="flex gap-2"><span className="text-primary">Souvenirs</span> en Photos et</div>
                        <div className="flex justify-center">Vidéos</div>
                    </div>
                </Title>
                <Media mediaContent={achievement} />
            </div>
        </div>
    );
}
