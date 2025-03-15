import React from 'react'
import BlogDetail from '../../../components/species/SpeciesDetail'

export default function index({ location, params }: { location: any, params: any }) {
    return (
        <SpeciesDetail location={location} params={params} />
    )
}
