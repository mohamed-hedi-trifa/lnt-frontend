import React from 'react'
import EditOpportunity from '@/components/admin/opportunities/EditOpportunities'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <EditOpportunity location={location} params={params} />
    </div>
  )
}
