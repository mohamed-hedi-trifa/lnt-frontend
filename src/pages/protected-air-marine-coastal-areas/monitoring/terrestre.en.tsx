import React from 'react'
import SuiviScientifique2 from '../../../components/visitor/aire-marine/monitoring/SuivieScientifique2'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'

export default function TerrestrePage() {
  return (
    <AMCPSidebarProvider>
      <SuiviScientifique2 />
    </AMCPSidebarProvider>
  )
}
