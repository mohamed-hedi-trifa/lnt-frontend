
import Training from '@/components/visitor/aire-marine/training/Training'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function AMCPFormation() {
  return (
    <AMCPSidebarProvider>
      <Training />
    </AMCPSidebarProvider>
  )
}
