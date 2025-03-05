import EventDetails from '@/components/visitor/Event/event-details/EventDetails'
import OpportunityDetails from '@/components/visitor/opportunities/OpportunityDetails/OpportunityDetails'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
      <div>
    <OpportunityDetails location={location} params={params} />
      </div>
    
    )
}