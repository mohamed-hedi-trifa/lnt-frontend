


import Events from '@/components/visitor/Event/Events'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function eventPage() {
  return (
    <AMCPSidebarProvider>
        <Events/>
    </AMCPSidebarProvider>
  )
}
