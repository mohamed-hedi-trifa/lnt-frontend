
import Training from '@/components/visitor/aire-marine/training/Training'
import News from '@/components/visitor/news/News'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <News />
    </AMCPSidebarProvider>
  )
}
