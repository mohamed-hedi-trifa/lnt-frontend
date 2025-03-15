import React from 'react'
import EditSpecies from '../../../../components/admin/species/EditSpecies'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditSpecies location={location} params={params} />
  )
}
