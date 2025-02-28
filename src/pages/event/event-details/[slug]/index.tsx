import EventDetails from '@/components/visitor/Event/event-details/EventDetails'
import NewsDetails from '@/components/visitor/news/NewsDetails/NewsDetails'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
      <div>
    <EventDetails location={location} params={params} />
      </div>
    
    )
}