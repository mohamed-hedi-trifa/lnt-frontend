import React from 'react'
import UpdatePreiousEvent from '@/components/admin/previous-event/UpdatePreiousEvent'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <UpdatePreiousEvent location={location} params={params} />
  )
}
