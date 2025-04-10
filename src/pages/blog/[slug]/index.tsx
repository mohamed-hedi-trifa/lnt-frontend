import SpeciesDetail from '@/components/species/SpeciesDetail'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
        <SpeciesDetail location={location} params={params} />
    )
}
