import React from 'react'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'
import SuiviScientifique from '@/components/visitor/aire-marine/monitoring/SuivieScientifique'

export default function PresentationPage() {
    return (
    <AMCPSidebarProvider>
        <SuiviScientifique />
    </AMCPSidebarProvider>)
}
