import React from 'react'
import UpdatePreviousEdition from '@/components/admin/previous-editions/UpdatePreviousEdition'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <UpdatePreviousEdition location={location} params={params} />
  )
}
