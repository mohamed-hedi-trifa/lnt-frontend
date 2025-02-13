


import Events from '@/components/visitor/Event/Events'
import NoEvents from '@/components/visitor/Event/no-event/noEvents'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function noEventPage() {
  return (
    <AMCPSidebarProvider>
        <NoEvents/>
    </AMCPSidebarProvider>
  )
}
