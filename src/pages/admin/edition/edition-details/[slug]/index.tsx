import EditionDetails from '@/components/admin/edition/EditionDetails'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditionDetails location={location} params={params} />
  )
}
