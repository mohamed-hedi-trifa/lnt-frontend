import React from 'react'
import EditPost from '../../../../components/admin/blog/EditPost'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditPost location={location} params={params} />
  )
}
