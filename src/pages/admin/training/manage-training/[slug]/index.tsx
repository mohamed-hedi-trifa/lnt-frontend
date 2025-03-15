import ManageTraining from '@/components/admin/training/ManageTraining'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManageTraining location={location} params={params} />
  )
}
