import React from 'react'
import BlogDetail from '../../../components/blog/BlogDetail'

export default function index({ location, params }: { location: any, params: any }) {
    return (
        <BlogDetail location={location} params={params} />
    )
}
