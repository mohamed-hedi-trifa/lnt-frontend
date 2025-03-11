import UpdateNews from '@/components/admin/news/UpdateNews'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <UpdateNews location={location} params={params} />
  )
}
