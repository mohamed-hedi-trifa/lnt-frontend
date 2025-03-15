import React from 'react'
import EditTraining from '@/components/admin/training/EditTraining'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <EditTraining location={location} params={params} />
  )
}
