import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlogDetail.css";
import Title from "../Title";
import { navigate } from "gatsby";

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

export default function BlogDetail({ location, params }: { location: any; params: any }) {
  const [blogPost, setBlogPost] = useState<any>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [location]);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/posts/${slug}`)
        .then((res) => {
          setBlogPost(res.data);

          // Extract language from URL query
          const searchParams = new URLSearchParams(location.search);
          const urlLanguage = searchParams.get("lang");

          // If language from URL is valid and content exists in that language
          if (urlLanguage && res.data[`title_${urlLanguage}`]) {
            setLanguage(urlLanguage);
          } else {
            // Default to English or French if the content is unavailable
            setLanguage(res.data.title_en ? "en" : "fr");
          }
        })
        .catch((err) => {
          console.error("Error fetching blog post:", err);
          navigate("/404"); // Handle error and navigate to 404 if needed
        });
    }
  }, [slug, location.search]);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full px-8 py-10 pt-[136px] max-w-3xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
        {blogPost.image && (
          <img
            src={`${process.env.GATSBY_API_URL}${blogPost.image}`}
            alt={blogPost.title}
            className="mb-8"
          />
        )}
        <div className="flex justify-between items-start border-b pb-4">
          <div className="flex flex-col gap-1">
            <Title
              size="text-3xl scr800:text-4xl"
              customClassName="font-poppins !text-teal-500 capitalize transition-all duration-1000"
            >
              {blogPost[`title_${language}`]}
            </Title>
            <p className="text-sm text-gray-500">{formatDate(blogPost.created_at)}</p>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <span className="semi-bold font-semibold">
              {language === "ar" ? "اللغة: " : "Language: "}
            </span>
            {blogPost.title_en && (
              <button
                className="bg-gray-100 p-1"
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </button>
            )}
            {blogPost.title_fr && (
              <button
                className="bg-gray-100 p-1"
                onClick={() => handleLanguageChange("fr")}
              >
                FR
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col">
          {blogPost?.content_items
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
                  ) : null
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
