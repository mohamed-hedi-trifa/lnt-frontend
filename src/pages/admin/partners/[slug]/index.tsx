import React from 'react'
import EditKeyMoment from '@/components/admin/KeyMoment/EditKeyMoment'
import EditPartner from '@/components/admin/partners/EditPartner'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditPartner location={location} params={params} />
  )
}
