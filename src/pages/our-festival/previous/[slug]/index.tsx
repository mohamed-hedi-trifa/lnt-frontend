
import EditionDetails from '@/components/visitor/our-festival/editionDetails/EdtionDetails'
import React from 'react'

export default function EditionDetail({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <EditionDetails location={location} params={params}/>
    </div>
  )
}
