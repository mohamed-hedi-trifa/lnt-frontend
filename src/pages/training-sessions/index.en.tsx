import TrainingSessions from '@/components/visitor/Event/event-list/EventList'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <TrainingSessions/>
    </AMCPSidebarProvider>
  )
}
