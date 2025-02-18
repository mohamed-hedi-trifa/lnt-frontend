

import Volunteering from '@/components/visitor/volunteering/Volunteering'
import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage() {
  return (
    <AMCPSidebarProvider>
      <Volunteering />
    </AMCPSidebarProvider>
  )
}
