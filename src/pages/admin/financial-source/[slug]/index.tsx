import React from 'react'
import EditFinancialSource from '@/components/admin/financial-source/EditFinancialSource'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <EditFinancialSource location={location} params={params} />
    </div>
  )
}
