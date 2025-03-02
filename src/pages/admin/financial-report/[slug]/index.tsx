import React from 'react'
import EditFinancialReport from '@/components/admin/financial-report/EditFinancialReport'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <EditFinancialReport location={location} params={params} />
    </div>
  )
}
