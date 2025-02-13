


import Events from '@/components/visitor/Event/Events'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function noEventPage() {
  return (
    <AMCPSidebarProvider>
        No event
    </AMCPSidebarProvider>
  )
}
