import React from 'react'
import SuiviScientifique3 from '../../../components/visitor/aire-marine/monitoring/SuivieScientifique3'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'

export default function MarinPage() {
  return (
    <AMCPSidebarProvider>
      <SuiviScientifique3 />
    </AMCPSidebarProvider>
  )
}
