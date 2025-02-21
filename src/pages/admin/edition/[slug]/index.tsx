import React from 'react'
import EditEdition from '@/components/admin/edition/EditEdition'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditEdition location={location} params={params} />
  )
}
