

import Benevole from '@/components/visitor/Benevole/Benevole'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <Benevole />
    </AMCPSidebarProvider>
  )
}
