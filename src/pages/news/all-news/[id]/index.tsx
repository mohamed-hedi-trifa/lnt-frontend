
import AllNewsFilter from '@/components/visitor/news/AllNewsFilter'

import { AMCPSidebarProvider } from '@/contexts/AMCPSidebarContext'
import React from 'react'

export default function newPage({ location, params }: { location: any, params: any }){
  return (
    <AMCPSidebarProvider>
          <AllNewsFilter  location={location} params={params}/>
    </AMCPSidebarProvider>
  )
}
