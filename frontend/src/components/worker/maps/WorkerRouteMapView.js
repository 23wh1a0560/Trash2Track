import React from 'react';
import { BinMapView } from '@/components/map/BinMapView';

const WorkerRouteMapView = () => {
  return (
    <div className="h-96">
      <BinMapView selectedStatus="all" />
    </div>
  );
};

export default WorkerRouteMapView;
