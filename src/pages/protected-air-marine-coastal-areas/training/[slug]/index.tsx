import TrainingDetails from '@/components/visitor/aire-marine/training/TrainingDetails'
import React from 'react'

export default function index({ location, params }: { location: any, params: any }) {
    return (
        <TrainingDetails location={location} params={params} />
    )
}
