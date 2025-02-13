
import Training from '@/components/visitor/aire-marine/training/Training'
import TrainingSessions from '@/components/visitor/training-sessions/TrainingSessions'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <TrainingSessions />
    </AMCPSidebarProvider>
  )
}
