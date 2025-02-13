
import Training from '@/components/visitor/aire-marine/training/Training'
import SportEvents from '@/components/visitor/Event/sport-events/SportEvents'
import News from '@/components/visitor/news/News'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function SportEvent() {
  return (
    <AMCPSidebarProvider>
        <SportEvents/>
    </AMCPSidebarProvider>
  )
}
