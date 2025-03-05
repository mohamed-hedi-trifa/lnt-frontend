import React from 'react'
import UpdateAchievement from '@/components/admin/achievements/UpdateAchievement'

export default function index({ location, params }: { location: any, params: any }) {
  return (
    <div>
      <UpdateAchievement location={location} params={params} />
    </div>
  )
}
