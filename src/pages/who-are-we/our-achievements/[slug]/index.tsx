import AchievementDetails from '@/components/visitor/who-are-we/our-achievements/AchievementDetails'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
        <div>
            <AchievementDetails location={location} params={params} />
        </div>

    )
}