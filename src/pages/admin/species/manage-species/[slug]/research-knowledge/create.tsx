import React from 'react'
import CreateResearchKnowledge from '@/components/admin/species/research-knowledge/CreateResearchKnowledge'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <CreateResearchKnowledge location={location} params={params} />
    </div>
  )
}
