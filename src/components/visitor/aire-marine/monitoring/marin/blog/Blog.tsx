import React, { useEffect, useState } from "react";
import achievementsHero from "../../../../../../assets/images/achievements-hero.jpg";
import PageTitle from "@/components/atoms/titles/PageTitle";
import AMCPSidebar from "@/components/layout/AMCPSidebar";
import SectionTitle from "@/components/atoms/titles/SectionTitle";
import Table from "@/components/visitor/who-are-we/rapports/Table";
import Media from "@/components/visitor/who-are-we/our-achievements/acheivement2/Media2";
import List from "@/components/atoms/List";
import Title from "@/components/atoms/titles/Title";
import PageParagraph from "@/components/atoms/PageParagraph";
import axios from "axios";
import { navigate } from "gatsby";

export default function Blog({ location, params }: { location: any; params: any }) {
  const [blogPost, setBlogPost] = useState<any>(null);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const slug = params.slug;

    console.log("-------------------- slug --------------------");
    console.log(slug);

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
          // @ts-ignore
          navigate("/404");
        });
    }
  }, [location]);

  console.log("-------------------- blogPost --------------------");
  console.log(blogPost);
  const dataTable = [
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
  ];

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <img className="w-full object-cover h-[80vh]" src={achievementsHero} />
      <div className="flex justify-center sm:justify-center pb-4 ">
        <div className="flex justify-center sm:justify-center pb-4 ">
          <PageTitle title="Suivi Marin" width="w-[160px]" fontSize="text-[48px] md:text-[64px] text-start" />
        </div>
      </div>
      <section className="px-4">
        <div className="max-w-6xl mx-auto ">
          <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
            <AMCPSidebar />

            <section className="grow w-fit flex flex-col">
              <SectionTitle
                title={blogPost ? blogPost[`title_${language}`] : ""}
                width="w-[160px]"
                color="#000000"
                fontSize=" text-[28px] lg:text-[40px] text-center sm:text-start"
                spacing="my-8 sm:mt-0"
              />
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
                            <img src={`${process.env.GATSBY_API_URL}${item.file_path}`} alt="" />
                          </div>
                        ) : item.type === "pdf" ? (
                          <div>
                            <a download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                              Download Pdf
                            </a>
                          </div>
                        ) : null
                      ) : null}
                    </div>
                  ))}
              </div>
            </section>
          </section>

          <div className=" grid grid-cols-[10%_auto_10%] ">
            <div></div>
            <div>
              <span className=" text-[28px] sm:text-[36px] font-bold">
                <p className="text-center">
                  <span className="text-[#0270A0]">Immersion visuelle</span> dans L'Ecosystéme de la{" "}
                </p>
                <p className="text-center">Posidonie</p>
              </span>
              <span className="">
                <p className="text-center text-[20px] font-semibold">Découvrez la richesse visuelle de la posidonie à travers les images</p>
                <p className="text-center text-[20px] font-semibold">captivantes et des vidéos éducatives</p>
              </span>
            </div>
            <div></div>
          </div>
          <Media />
          <hr className="border-2 border-[#ADA5A5] my-10" />
          <span className="text-[28px] sm:text-[36px] font-bold">
            <p className="text-center">
              <span className="text-[#0270A0]">Recherche</span> et Connaissances sur la Posidonie{" "}
            </p>
          </span>
          <div className="my-10"></div>
          <div className="font-semibold text-[18px] sm:text-[20px]">
            <p className="text-center">La recherche scienntifique sue la Posidonie, plante emblématique de la </p>
            <p className="text-center">Méditerannée, est essentielle pour comprendre son roleécologique et les menaces</p>
            <p className="text-center">auxquelles, elle fait face. Cette section regroupedes rapports et des articles </p>
            <p className="text-center">détaillant les résultats des suivis scientifiques, les méthodologies utilisées,et les </p>
            <p className="text-center"> recommendations pour préserver cet écosystémeclé dans l'archipelde </p>
            <p className="text-center">Kerkennah</p>
          </div>

          <Table data={dataTable} />

          <section className="border-t border-[#ADA5A5] my-[20px]">
            <span className="font-bold ">
              <p className="text-center text-[28px] sm:text-[36px] ">
                <span className="text-[#0270A0] ">Découvrez</span> d'autres espèces fascinantes qui{" "}
              </p>
              <p className="text-center text-[28px] sm:text-[36px]">peuplent nos écosystèmes marins</p>
              <p className="text-center text-[18px] sm:text-[20px]">Découvrez les trésors marins que nous préservons</p>
            </span>
          </section>
        </div>
      </section>
    </div>
  );
}

const parseContent = (content: any) => {
  if (!content) return "";

  // Replace **bold** with <strong>bold</strong>
  const boldParsed = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Detect URLs and convert them to clickable links
  const linkParsed = boldParsed.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>');

  return linkParsed;
};
