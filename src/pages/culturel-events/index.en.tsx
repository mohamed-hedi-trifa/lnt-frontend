

import CulturelEvents from '@/components/visitor/Event/culturel-events/CulturelEvents'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function culturalEvent() {
  return (
    <AMCPSidebarProvider>
      <CulturelEvents />
    </AMCPSidebarProvider>
  )
}
