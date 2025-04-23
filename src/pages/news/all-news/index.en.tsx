
import AllNews from '@/components/visitor/news/AllNews'
import News from '@/components/visitor/news/News'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <AllNews />
    </AMCPSidebarProvider>
  )
}
