import ManageAchievement from '@/components/admin/achievements/ManageAchievement'
import React from 'react'


export default function index({ location, params }: { location: any, params: any }) {
  return (
    <ManageAchievement location={location} params={params} />
  )
}
