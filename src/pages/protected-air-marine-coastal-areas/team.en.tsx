import AmcpTeam from '@/components/visitor/aire-marine/amcp-team/AmcpTeam'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function AMCPTeam() {
  return (
    <AMCPSidebarProvider>
      <AmcpTeam />
    </AMCPSidebarProvider>
  )
}
