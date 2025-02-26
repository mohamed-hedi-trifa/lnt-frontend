import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import Breadcrumbs from "@/components/Breadcumbs";
import Line from "@/components/atoms/Line";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import XIcon from "@/assets/icons/XIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import NewsLetterSub2 from "@/components/NewsLetterSub2";
import Button from "@/components/atoms/Button";
import PageParagraph from "@/components/atoms/PageParagraph";
import parseContent from "@/lib/parseContent";
import formatDate from "@/lib/formatDate";
import ImageGallery from "../../ImageGallery";
import Media from "../../Media";

const CATEGORIES = [
  {
    name: "Art et Patrimoine"
  },
  {
    name: "Art et Patrimoine"
  },
  {
    name: "Art et Patrimoine"
  },
]

const Category = ({ category }: { category: any }) => <div className="py-[6px] px-3 bg-[#0270A0] text-white font-medium text-sm leading-[20px] rounded-md">{category.name}</div>;

const Article = ({ article, lang }: { article: any, lang: string }) => <article className="flex flex-col gap-[15px] py-[25px] w-full">
  <div className="w-full lg:w-[330px] lg:h-[226px] overflow-hidden">
    <img src={`${process.env.GATSBY_API_URL}${article.image}`} className="rounded-xl shadow-[0px_4px_4px_0px_#00000040] object-cover" />
  </div>
  <Title
    size="text-[20px] font-semibold leading-[32px] capitalize"
    customClassName=""
  >
    {article[`title_${lang}`]}
  </Title>
  <div className="text-sm text-gray-500">{formatDate(article.created_at)}</div>
</article>

export default function TrainingDetails({ location, params }: { location: any; params: any }) {
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
          // @ts-ignore
          navigate("/404");
        });
    }
  }, [slug, location.search]);

  const [posts, setPosts] = useState<any[]>();

  function getPosts() {

    axios.get(`/api/get-active-posts`).then(res => {
      setPosts(res.data.data);
    }).catch(err => {
      // Swal.fire('Error', err?.response?.data?.message, "error");
    });
  }
  useEffect(() => {
    getPosts();
  }, [])

  const RightSidebar = () => <aside className={`flex flex-col gap-6 sm:sticky top-[116px] h-fit w-full lg:w-[330px] shrink-0`}>
    <div className="text-[#183354] text-xl font-bold font-['Montserrat'] capitalize leading-relaxed">Suivez-nous</div>
    <Line />

    <div className='grid grid-cols-2 gap-1'>
      <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
        <div className='text-black'><FacebookIcon /></div>
        <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">facebook</div>
      </Link>
      <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
        <div className='text-black'><XIcon /></div>
        <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">X</div>
      </Link>
      <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
        <div className='text-black'><InstagramIcon /></div>
        <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Instagram</div>
      </Link>
      <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
        <div className='text-black'><YoutubeIcon /></div>
        <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Youtube</div>
      </Link>
      <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
        <div className='text-black'><LinkedinIcon /></div>
        <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Linkedin</div>
      </Link>
    </div>

    <NewsLetterSub2 />
    <div className="h-[279.40px] flex-col justify-center gap-[25px] flex">
      <div className="self-stretch h-[26.40px] text-[#183354] text-xl font-bold font-['Montserrat'] capitalize leading-relaxed">Une Question ?</div>
      <div><Line /></div>
      <div className="lg:w-[300px] text-black text-lg lg:text-[15px] font-bold font-['Montserrat'] capitalize leading-normal">Besoin de plus d'informations ? <span className="block lg:inline">N'hésitez pas à nous contacter.</span> Cliquez sur le Bouton ci-dessous pour accéder à notre page de contact et poser vos questions</div>
      <Button variant='primary' customClassnames='mx-auto'>
        <div className="text-white text-xl font-bold font-['Montserrat'] leading-tight">Contactez-Nous</div>
      </Button>
    </div>

    <div>
      <div className="flex flex-col gap-[25px]">
        <div className="self-stretch h-[26.40px] text-[#183354] text-xl font-bold font-['Montserrat'] capitalize leading-relaxed">Initiatives similaires</div>
        <Line />
      </div>
      <div className="divide-y divide-black divide w-full">
        {
          posts?.map((post) => <Article article={post} lang={language} />)
        }
      </div>
    </div>

  </aside>;

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pt-[56px] lg:pt-[106px] px-[17.5px] lg:px-0">
      <div className="max-w-[1223px] mx-auto mt-3 lg:mt-6">
        <Breadcrumbs />
      </div>
      <section className='max-w-[1223px] mx-auto mt-[40px] lg:mt-[80px]'>

        <section className="flex flex-col sm:flex-row gap-[55px]">

          <div className="w-full flex-1 flex flex-col gap-8" dir={language === "ar" ? "rtl" : "ltr"}>
            <div>
              <Title
                size="text-[30px] lg:text-[36px] font-semibold leading-[44px] capitalize"
                customClassName=""
              >
                {blogPost[`title_${language}`]}
              </Title>
              <div className="flex flex-wrap gap-[8px] mt-4">
                {CATEGORIES.map((category: any) => <Category category={category} />)}
              </div>
              <div className="mt-5">
                <p className="text-sm text-gray-500">{formatDate(blogPost.created_at)}</p>
              </div>
            </div>
            <div>
              {blogPost.image && (
                <img
                  src={`${process.env.GATSBY_API_URL}${blogPost.image}`}
                  alt={blogPost.title}
                  className="rounded-xl"
                />
              )}
            </div>

            <div className="flex flex-col">
              {blogPost?.content_items
                ?.sort((a: any, b: any) => a.order - b.order)
                .map((item: any) => (
                  <div key={item.id}>
                    {item.language === language ? (
                      item.type === "title" ? (
                        <Title customClassName="mb-2">{item.content}</Title>
                      ) : item.type === "text" ? (
                        // Apply the markdown parser to the text content
                        <PageParagraph>
                          <div
                            className="mb-4"
                            dangerouslySetInnerHTML={{
                              __html: parseContent(item.content),
                            }}
                          />
                        </PageParagraph>
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
            <hr className="border-black mx-7 mt-[32px]" />
                 <Title customClassName="!font-bold hidden lg:block" size="!text-[32px]">
                      <span className="text-primary">Souvenirs</span> en Photos et Vidéos
                    </Title>
                    <Title customClassName="!font-bold block lg:hidden" size="!text-[28px]">
                      <div className="flex flex-col">
                     <div className="flex gap-2"><span className="text-primary">Souvenirs</span> en Photos et</div> 
                       <div className="flex justify-center">Vidéos</div>
                      </div>
                    </Title>
            <Media />
          </div>

          <RightSidebar />
        </section>
      </section>

    </div>
  );
}
