import NewsDetails from '@/components/visitor/news/NewsDetails/NewsDetails'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <NewsDetails location={location} params={params} />
    </div>

  )
}