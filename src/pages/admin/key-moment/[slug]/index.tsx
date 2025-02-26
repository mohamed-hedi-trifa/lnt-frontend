import React from 'react'
import EditKeyMoment from '@/components/admin/KeyMoment/EditKeyMoment'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditKeyMoment location={location} params={params} />
  )
}
