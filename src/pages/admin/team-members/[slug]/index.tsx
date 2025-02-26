import React from 'react'
import EditTeamMembers from '@/components/admin/TeamMembers/EditTeamMembers'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditTeamMembers location={location} params={params} />
  )
}
