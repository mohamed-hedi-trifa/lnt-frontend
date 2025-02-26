import ManagePreviousEvent from '@/components/admin/previous-event/ManagePreviousEvent'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManagePreviousEvent location={location} params={params} />
  )
}
