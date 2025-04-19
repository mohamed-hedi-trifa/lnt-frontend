import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import achievementsHero from '../../../../../../assets/images/achievements-hero.jpg'
import SectionTitle2 from '@/components/atoms/titles/SectionTitle2'
import Title from '@/components/atoms/titles/Title'
import PageParagraph from '@/components/atoms/PageParagraph'
import SpeciesTitle from '@/components/atoms/titles/SpeciesTitle'
import DecouvrezDautresEspeces from './DecouvrezDautresEspeces'
import Media from '@/components/visitor/Media'
import AMCPSuiviScientifiqueSidebar from '@/components/layout/AMCPSuiviScientifiqueSidebar'
import PdfIcon from '@/assets/icons/PdfIcon.png'
import TableSpecies from './TableSpecies'

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
)

const parseContent = (c: string) =>
  c
    ? c
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>')
    : ''

export default function Species({ location, params }: { location: any; params: any }) {
  const [blogSpecies, setBlogSpecies] = useState<any>(null)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const slug = params.slug
    if (slug)
      axios
        .get(`/api/species/${slug}`)
        .then(res => {
          res.data.content_items.forEach((i: any) => i.type === 'list' && (i.content = JSON.parse(i.content)))
          setBlogSpecies(res.data)
          const urlLang = new URLSearchParams(location.search).get('lang')
          setLanguage(urlLang && res.data[`title_${urlLang}`] ? urlLang : res.data.title_en ? 'en' : 'fr')
        })
        .catch(() => navigate('/404'))
  }, [location, params.slug])

  const loading = !blogSpecies

  return (
    <div
      className="min-h-full bg-cover bg-center md:bg-fixed bg-local"
      style={{ backgroundImage: loading ? 'none' : `url(${process.env.GATSBY_API_URL}${blogSpecies.image})` }}
    >
      <img src={achievementsHero} alt="" className="w-full h-[50vh] md:h-[80vh] object-cover" />

      <div className="flex justify-center pb-4">
        {loading ? <ShimmerBar className="h-12 w-1/2 max-w-[300px]" /> : <SpeciesTitle title={blogSpecies[`title_${language}`]} width="w-[160px]" fontSize="text-[48px] md:text-[64px] text-start" />}
      </div>

      <section className="px-4 sm:px-6 lg:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row relative sm:gap-8">
            <AMCPSuiviScientifiqueSidebar />
            <div className="grow w-full flex flex-col mx-auto shadow-helmi gap-4 rounded-[12px] bg-[rgba(255,255,255,0.8)] px-4 sm:px-0">
              {loading ? (
                <div className="flex flex-col gap-6 py-6">
                  <ShimmerBar className="h-8 w-3/4 mx-auto" />
                  <ShimmerBar className="h-5 w-11/12 mx-auto" />
                  <ShimmerBar className="h-5 w-11/12 mx-auto" />
                </div>
              ) : (
                <>
                  <SectionTitle2
                    title={blogSpecies[`subtitle_${language}`]}
                    width="w-full"
                    color="#000"
                    fontSize="text-[28px] lg:text-[36px] text-center sm:text-start font-semibold italic"
                    spacing="sm:mt-0 px-2 sm:px-10 pt-6"
                  />
                  {blogSpecies[`summary_${language}`] && (
                    <div className="px-4 sm:px-16 text-center sm:text-start">
                      <PageParagraph>{blogSpecies[`summary_${language}`]}</PageParagraph>
                    </div>
                  )}
                  {blogSpecies.content_items
                    .filter((i: any) => i.language === language && i.type !== 'list')
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((item: any) => {
                      if (item.type === 'title')
                        return (
                          <Title variant="pill" size="text-[24px] sm:text-[24px]" key={item.id} customClassName="items-start sm:px-10 mt-2">
                            {item.content}
                          </Title>
                        )
                      if (item.type === 'text')
                        return (
                          <PageParagraph key={item.id}>
                            <div className="px-4 sm:px-16 sm:text-start" dangerouslySetInnerHTML={{ __html: parseContent(item.content) }} />
                          </PageParagraph>
                        )
                      if (item.type === 'image')
                        return (
                          <div key={item.id} className="mb-2">
                            <img src={`${process.env.GATSBY_API_URL}${item.file_path}`} alt="" className="w-full max-w-[600px] mx-auto max-h-[400px] rounded-lg shadow-lg mb-4" />
                          </div>
                        )
                      if (item.type === 'pdf')
                        return (
                          <div key={item.id}>
                            <a download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                              <div className="mb-10 flex items-center sm:px-10">
                                <img src={PdfIcon} alt="" className="h-16 w-[50px]" />
                                <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">{item.file_path}</p>
                              </div>
                            </a>
                          </div>
                        )
                      if (item.type === 'cin') return null
                      return null
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-[rgba(255,255,255,0.8)] mt-[60px] shadow-helmi">
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
          {loading ? (
            <div className="flex flex-col gap-6 items-center py-10">
              <ShimmerBar className="h-8 w-2/3" />
              <ShimmerBar className="h-6 w-3/4" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center py-10">
                <h1 className="text-[28px] sm:text-[36px] font-bold text-center">
                  <span className="text-[#0270A0]">Immersion visuelle</span> dans l'écosystème de {blogSpecies.title_fr || blogSpecies.title_en}
                </h1>
                <PageParagraph>
                  <p className="text-[20px] font-semibold mt-4 mx-4 sm:mx-20 text-center">
                    Découvrez la richesse visuelle de {blogSpecies.title_fr || blogSpecies.title_en} à travers des images captivantes et des vidéos éducatives
                  </p>
                </PageParagraph>
              </div>
              <Media mediaContent={blogSpecies} />
              <hr className="my-10 border-1 border-[#000]" />
              <div className="text-center mx-4 sm:mx-20">
                <h1 className="text-[28px] sm:text-[36px] font-bold">
                  <span className="text-[#0270A0]">Recherche</span> et Connaissances sur {blogSpecies.title_research_knowledge_en || blogSpecies.title_research_knowledge_fr}
                </h1>
              </div>
              <PageParagraph>
                <div className="mx-4 sm:mx-28 py-4 font-semibold text-[18px] sm:text-[20px] text-center">
                  {blogSpecies.description_research_knowledge_en || blogSpecies.description_research_knowledge_fr}
                </div>
              </PageParagraph>
              <TableSpecies data={blogSpecies.researchKnowledge} />
              <section className="border-t border-[#000] mt-10 py-10">
                <DecouvrezDautresEspeces currentBlog={blogSpecies} />
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
