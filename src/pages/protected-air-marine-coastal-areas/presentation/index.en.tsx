import React from 'react'
import Presentation from '../../../components/visitor/aire-marine/presentation/Presentation'
import { AMCPSidebarProvider } from '../../../contexts/AMCPSidebarContext'

export default function PresentationPage() {
    return (
        <AMCPSidebarProvider>
            <Presentation />
        </AMCPSidebarProvider>
)
}
