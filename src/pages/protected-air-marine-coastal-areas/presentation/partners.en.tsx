import React from 'react'
import PresentationPartenaire from '../../../components/visitor/aire-marine/presentation/PresentationPartenaire'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'

export default function AMCPPartnersPage() {
  return (
    <AMCPSidebarProvider>
      <PresentationPartenaire />
    </AMCPSidebarProvider>
  )
}
