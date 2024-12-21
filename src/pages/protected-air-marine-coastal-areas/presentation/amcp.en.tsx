import React from 'react'
import PresentationSection2 from '../../../components/visitor/aire-marine/presentation/PresentationSection2'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'

export default function AMCPPage() {
  return (
    <AMCPSidebarProvider>
      <PresentationSection2 />
    </AMCPSidebarProvider>
  )
}
