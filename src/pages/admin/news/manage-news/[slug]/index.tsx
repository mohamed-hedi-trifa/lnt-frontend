import ManageNews from '@/components/admin/news/ManageNews'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManageNews location={location} params={params} />
  )
}
