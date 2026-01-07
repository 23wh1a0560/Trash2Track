import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import { DivIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
//import { Badge } from '@/components/ui/badge'
import { MapPin, TrendingUp } from 'lucide-react'

// Sample bin locations
const binLocations = [
  {
    id: 'BIN-001',
    zone: 'Downtown North',
    type: 'Organic',
    fillLevel: 85,
    status: 'critical',
    lat: 40.7580,
    lng: -73.9855,
    trend: 'up',
  },
  {
    id: 'BIN-002',
    zone: 'Downtown South',
    type: 'Plastic',
    fillLevel: 65,
    status: 'warning',
    lat: 40.7489,
    lng: -73.9680,
    trend: 'up',
  },
  {
    id: 'BIN-003',
    zone: 'Eastside',
    type: 'Metal',
    fillLevel: 35,
    status: 'normal',
    lat: 40.7614,
    lng: -73.9776,
    trend: 'stable',
  },
  {
    id: 'BIN-004',
    zone: 'Westside',
    type: 'Organic',
    fillLevel: 92,
    status: 'critical',
    lat: 40.7589,
    lng: -73.9925,
    trend: 'up',
  },
  {
    id: 'BIN-005',
    zone: 'Central Park',
    type: 'Plastic',
    fillLevel: 45,
    status: 'normal',
    lat: 40.7829,
    lng: -73.9654,
    trend: 'stable',
  },
]

// Create custom marker icon
const createCustomIcon = (status, fillLevel) => {
  const color = status === 'critical' ? '#e76f51' : status === 'warning' ? '#f4a261' : '#2a9d8f'

  return new DivIcon({
    className: 'custom-icon',
    html: `
      <div style="position: relative;">
        <div style="
          width: 36px;
          height: 36px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            color: white;
            font-weight: bold;
            font-size: 11px;
            transform: rotate(45deg);
          ">${fillLevel}%</span>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'critical':
      return '#e76f51'
    case 'warning':
      return '#f4a261'
    default:
      return '#2a9d8f'
  }
}

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'critical':
      return 'destructive'
    case 'warning':
      return 'secondary'
    default:
      return 'default'
  }
}

// MapUpdater component
function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])
  return null
}

export function BinMapView({ selectedStatus = 'all' }) {
  const [filteredBins, setFilteredBins] = useState(binLocations)
  const [mapCenter] = useState([40.7580, -73.9855])

  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredBins(binLocations)
    } else {
      setFilteredBins(binLocations.filter((bin) => bin.status === selectedStatus))
    }
  }, [selectedStatus])

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapUpdater center={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredBins.map((bin) => (
          <div key={bin.id}>
            <Marker
              position={[bin.lat, bin.lng]}
              icon={createCustomIcon(bin.status, bin.fillLevel)}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-base">{bin.id}</h3>
                      <p className="text-sm text-gray-600">{bin.zone}</p>
                    </div>
                    <span
  style={{
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor:
      bin.status === 'critical'
        ? '#e76f51'
        : bin.status === 'warning'
        ? '#f4a261'
        : '#2a9d8f',
    color: 'white',
    fontSize: '12px',
  }}
>
  {bin.status}
</span>

                    {/*<Badge variant={getStatusBadgeVariant(bin.status)}>
                      {bin.status}
                    </Badge>*/}
                  </div>

                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{bin.type}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Fill Level:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{bin.fillLevel}%</span>
                        {bin.trend === 'up' && (
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div
                        className="h-2 bg-gray-200 rounded-full overflow-hidden"
                        title={`${bin.fillLevel}% full`}
                      >
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${bin.fillLevel}%`,
                            backgroundColor: getStatusColor(bin.status),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>

            <Circle
              center={[bin.lat, bin.lng]}
              radius={200}
              pathOptions={{
                color: getStatusColor(bin.status),
                fillColor: getStatusColor(bin.status),
                fillOpacity: 0.1,
                weight: 1,
              }}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  )
}