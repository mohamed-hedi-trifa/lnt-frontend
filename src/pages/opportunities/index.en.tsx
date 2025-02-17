
import News from '@/components/visitor/news/News'
import Opportunities from '@/components/visitor/opportunities/Opportunities'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <Opportunities />
    </AMCPSidebarProvider>
  )
}
