import React from 'react'
import SuiviScientifique from '../../../components/visitor/aire-marine/monitoring/SuivieScientifique'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'

export default function PresentationPage() {
    return (
    <AMCPSidebarProvider>
        <SuiviScientifique />
    </AMCPSidebarProvider>)
}
