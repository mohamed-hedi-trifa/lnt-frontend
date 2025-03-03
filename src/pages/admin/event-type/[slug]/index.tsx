import React from 'react'
import UpdateEventType from '@/components/admin/event-type/UpdateEventType'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <UpdateEventType location={location} params={params} />
  )
}
