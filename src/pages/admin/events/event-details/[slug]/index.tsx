import EditionDetails from '@/components/admin/edition/EditionDetails'
import EventDetails from '@/components/admin/event/EventDetails'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EventDetails location={location} params={params} />
  )
}
