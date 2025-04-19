import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import Title from '@/components/atoms/titles/Title'
import PageParagraph2 from '@/components/atoms/PageParagraph2'
import Calendar from '@/assets/icons/Calendar'
import Media from '../../Media'
import PdfIcon from '@/assets/icons/PdfIcon.png'
import './AchievementDetailsContent.css'
import SectionHeader from '@/components/SectionHeader'

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

export default function AchievementDetailsContent({ location, params }: { location: any; params: any }) {
  const [achievement, setAchievement] = useState<any>(null)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    axios
      .get(`/api/achievements/${params.slug}`)
      .then(res => {
        setAchievement(res.data)
        const urlLang = new URLSearchParams(location.search).get('lang')
        setLanguage(urlLang && res.data[`title_${urlLang}`] ? urlLang : res.data.title_en ? 'en' : 'fr')
      })
      .catch(() => navigate('/404'))
  }, [location.search, params.slug])

  const loading = !achievement

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-8 text-start max-w-3xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {loading ? (
          <div className="flex flex-col gap-5">
            <ShimmerBar className="h-10 w-3/4" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerBar key={i} className="h-6 w-20" />
              ))}
            </div>
            <ShimmerBar className="h-4 w-32" />
            <ShimmerBar className="h-[300px] w-full rounded-md" />
            <div className="mt-10 flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerBar key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <h2 className="text-[28px] sm:text-[36px] font-semibold">{achievement.title_en || achievement.title_fr}</h2>
              {achievement.themes && achievement.themes.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                  {achievement.themes.map((theme: any) => (
                    <div key={theme.id} className="px-2.5 py-1 bg-[#0270A0] rounded-md inline-flex justify-center items-center gap-2 shadow-lg">
                      <span className="text-white text-sm font-medium">{theme.name_en || theme.name_fr}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calendar />
                <span>
                  Le{' '}
                  {new Date(achievement.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <img
                src={`${process.env.GATSBY_API_URL}${achievement.image}`}
                alt=""
                className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-lg"
              />
            </div>

            <div className="mt-10 flex flex-col gap-4">
              {achievement.content_items
                ?.sort((a: any, b: any) => a.order - b.order)
                .map((item: any) => (
                  <div key={item.id}>
                    {item.language === language && (
                      <>
                        {item.type === 'title' && (
                          <Title customClassName="mt-8" variant="pill" size="text-[24px]">
                            {item.content}
                          </Title>
                        )}
                        {item.type === 'text' && (
                          <PageParagraph2>
                            <div className="mb-4 ml-6" dangerouslySetInnerHTML={{ __html: parseContent(item.content) }} />
                          </PageParagraph2>
                        )}
                        {item.type === 'image' && (
                          <div className="mb-2 flex justify-center">
                            <img
                              src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                              alt=""
                              className="w-full h-auto max-w-[600px] object-cover rounded-md shadow-lg"
                            />
                          </div>
                        )}
                        {item.type === 'pdf' && (
                          <div className="mb-2">
                            <a download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                              <div className="mb-10 flex items-center">
                                <img src={PdfIcon} alt="" className="h-16 w-[50px]" />
                                <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">{item.file_path}</p>
                              </div>
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
            </div>

            <hr className="border-t border-black mt-10" />
        <SectionHeader
          title={
            <span>
              <span className="text-[#0270A0]">Souvenirs</span> en Photos et Vidéos
            </span>
            
          }
          text=""
        />
        <div className="mb-20">
          <Media mediaContent={achievement} />
        </div>
          </>
        )}
      </div>
    </div>
  )
}
