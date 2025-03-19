import ManageSpecies from '@/components/admin/species/ManageSpecies'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManageSpecies location={location} params={params} />
  )
}
