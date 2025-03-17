
import UpcomingFestivalDetails from '@/components/visitor/our-festival/upcoming/UpcomingFestivalDetails';
import React from 'react';
export default function index({ location, params }: { location: any, params: any }) {
    return (
        <UpcomingFestivalDetails location={location} params={params} />
    )
}