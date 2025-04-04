import EventDetails from '@/components/visitor/Event/event-details/EventDetails'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
      <div>
    { <EventDetails location={location} params={params} />}
      </div>
    
    )
}