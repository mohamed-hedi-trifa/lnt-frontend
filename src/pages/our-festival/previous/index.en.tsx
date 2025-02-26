import Opportunities from '@/components/visitor/opportunities/Opportunities'
import PreviousEdition from '@/components/visitor/our-festival/previous/PreviousEdition'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <PreviousEdition />
    </AMCPSidebarProvider>
  )
}
