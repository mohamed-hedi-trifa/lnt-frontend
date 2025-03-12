import React from 'react'
import UpdateManagementPlan from '@/components/admin/management-plan/UpdateManagementPlan'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <UpdateManagementPlan location={location} params={params} />
  )
}
