import React from 'react'
import EditTheme from '@/components/admin/theme/EditTheme'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditTheme location={location} params={params} />
  )
}
