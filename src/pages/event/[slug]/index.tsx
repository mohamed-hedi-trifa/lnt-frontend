import EventList from '@/components/visitor/Event/event-list/EventList'


import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
      <div>
         <EventList location={location} params={params} />
      </div>
    
    )
}