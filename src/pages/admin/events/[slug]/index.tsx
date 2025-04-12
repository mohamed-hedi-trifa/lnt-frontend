import React from 'react';
import EditEvent from '@/components/admin/event/EditEvent';

export default function index({ location, params }: { location: any; params: any }) {
  return (
    <div>
      <EditEvent location={location} params={params} />
    </div>
  );
}
