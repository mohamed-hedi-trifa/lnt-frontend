import EditionDetails from '@/components/admin/edition/EditionDetails'
import ManagePreviousEdition from '@/components/admin/previous-editions/ManagePreviousEdition'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManagePreviousEdition location={location} params={params} />
  )
}
