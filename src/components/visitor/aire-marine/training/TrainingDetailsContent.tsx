import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import Title from '@/components/atoms/titles/Title'
import BlogList from '../monitoring/marin/species/BlogList'
import Calendar from '@/assets/icons/Calendar'
import Media from '../../Media'
import PageParagraph from '@/components/atoms/PageParagraph'
import PdfIcon from '@/assets/icons/PdfIcon.png'
import SectionHeader from '@/components/SectionHeader'

const Shimmer = ({ className = '' }: { className?: string }) => (
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

export default function TrainingDetailsContent({ location, params }: { location: any; params: any }) {
  const [training, setTraining] = useState<any>(null)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    axios
      .get(`/api/training/${params.slug}`)
      .then(res => {
        setTraining(res.data)
        const urlLang = new URLSearchParams(location.search).get('lang')
        setLanguage(urlLang && res.data[`title_${urlLang}`] ? urlLang : res.data.title_en ? 'en' : 'fr')
      })
      .catch(() => navigate('/404'))
  }, [location.search, params.slug])

  const loading = !training

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-8 text-start max-w-3xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {loading ? (
          <div className="flex flex-col gap-5">
            <Shimmer className="h-10 w-3/4" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Shimmer key={i} className="h-6 w-20" />
              ))}
            </div>
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-[300px] w-full rounded-md" />
            <div className="mt-10 flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Shimmer key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <h2 className="text-[28px] sm:text-[36px] font-semibold">{training.title_en || training.title_fr}</h2>
              {training.themes?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                  {training.themes.map((t: any) => (
                    <div key={t.id} className="px-2.5 py-1 bg-[#0270A0] rounded-md shadow-lg">
                      <span className="text-white text-sm font-medium">{t.name_en || t.name_fr}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calendar />
                <span>
                  Le{' '}
                  {new Date(training.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <img src={`${process.env.GATSBY_API_URL}${training.image}`} alt="" className="w-full max-h-[500px] object-cover rounded-md shadow-lg" />
            </div>

            <div className="mt-10 flex flex-col gap-4">
              {training.content_items
                ?.sort((a: any, b: any) => a.order - b.order)
                .map((item: any) =>
                  item.language !== language ? null : item.type === 'title' ? (
                    <Title key={item.id} variant="pill" size="text-[24px]" customClassName="mt-8">
                      {item.content}
                    </Title>
                  ) : item.type === 'text' ? (
                    <PageParagraph key={item.id}>
                      <div className="mb-4 ml-6" dangerouslySetInnerHTML={{ __html: parseContent(item.content) }} />
                    </PageParagraph>
                  ) : item.type === 'image' ? (
                    <div key={item.id} className="mb-2 flex justify-center">
                      <img src={`${process.env.GATSBY_API_URL}${item.file_path}`} alt="" className="w-full max-w-[600px] object-cover rounded-md shadow-lg" />
                    </div>
                  ) : item.type === 'pdf' ? (
                    <div key={item.id} className="mb-2">
                      <a download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                        <div className="mb-10 flex items-center">
                          <img src={PdfIcon} alt="" className="h-16 w-[50px]" />
                          <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">{item.file_path.split('/').pop().split('5555_')[1]}</p>
                        </div>
                      </a>
                    </div>
                  ) : item.type === 'list' ? (
                    <div key={item.id} className="mb-2">
                      <BlogList content={item.content} />
                    </div>
                  ) : null
                )}
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
          <Media mediaContent={training} />
        </div>
          </>
        )}
      </div>
    </div>
  )
}
