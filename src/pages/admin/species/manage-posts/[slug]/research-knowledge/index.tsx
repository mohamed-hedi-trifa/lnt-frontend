import ResearchKnowledge from '@/components/admin/species/research-knowledge/ResearchKnowledge'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <ResearchKnowledge location={location} params={params} />
    </div>
  )
}
