import EventDetails from '@/components/admin/event/EventDetails'
import React from 'react'


export default function index({  params }: { params: any }) {
  return (
    <EventDetails params={params} />
  )
}
