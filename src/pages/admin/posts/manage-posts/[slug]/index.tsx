import EditionDetails from '@/components/admin/edition/EditionDetails'
import ManageBlog from '@/components/admin/blog/ManageBlog'
import React from 'react'
import Blog from '@/components/admin/blog/Blog'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManageBlog location={location} params={params} />
  )
}
