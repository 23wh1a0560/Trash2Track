import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

/* ---------------- ROUTE DATA ---------------- */

const collectionRoutes = [
  {
    routeId: "RT-001",
    zone: "Downtown North",
    status: "scheduled",
    color: "#f59e0b",
    binsCount: 12,
    distance: "15.2 km",
    estimatedDuration: "2.5h",
    efficiency: 92,
    points: [
      { lat: 40.7580, lng: -73.9855, order: 1, binId: "BIN-001" },
      { lat: 40.7614, lng: -73.9776, order: 2, binId: "BIN-003" },
      { lat: 40.7700, lng: -73.9800, order: 3, binId: "BIN-008" },
      { lat: 40.7829, lng: -73.9654, order: 4, binId: "BIN-005" }
    ]
  },
  {
    routeId: "RT-002",
    zone: "Downtown South",
    status: "in-progress",
    color: "#10b981",
    binsCount: 15,
    distance: "18.7 km",
    estimatedDuration: "3h",
    efficiency: 88,
    points: [
      { lat: 40.7489, lng: -73.9680, order: 1, binId: "BIN-002" },
      { lat: 40.7500, lng: -73.9500, order: 2, binId: "BIN-007" },
      { lat: 40.7356, lng: -73.9958, order: 3, binId: "BIN-006" }
    ]
  },
  {
    routeId: "RT-004",
    zone: "Westside",
    status: "completed",
    color: "#94a3b8",
    binsCount: 14,
    distance: "16.8 km",
    estimatedDuration: "2.8h",
    efficiency: 90,
    points: [
      { lat: 40.7589, lng: -73.9925, order: 1, binId: "BIN-004" },
      { lat: 40.7580, lng: -73.9855, order: 2, binId: "BIN-001" }
    ]
  }
]

/* ---------------- ICONS ---------------- */

const truckIcon = (color) =>
  new L.DivIcon({
    className: "",
    html: `
      <div style="
        width:42px;height:42px;
        background:${color};
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        border:4px solid white;
        box-shadow:0 4px 10px rgba(0,0,0,.3);
        font-size:20px;
      ">🚛</div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  })

const stopIcon = (n, color) =>
  new L.DivIcon({
    className: "",
    html: `
      <div style="
        width:26px;height:26px;
        background:${color};
        border-radius:50%;
        border:2px solid white;
        display:flex;align-items:center;justify-content:center;
        color:white;font-weight:bold;font-size:12px;
      ">${n}</div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  })

/* ---------------- MAP CENTER HANDLER ---------------- */

function MapAutoCenter({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 12)
  }, [center])
  return null
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function RouteMapView({ selectedStatus = "all" }) {
  const [routes, setRoutes] = useState(collectionRoutes)
  const center = [40.758, -73.985]

  useEffect(() => {
    if (selectedStatus === "all") setRoutes(collectionRoutes)
    else setRoutes(collectionRoutes.filter(r => r.status === selectedStatus))
  }, [selectedStatus])

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <MapAutoCenter center={center} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {routes.map(route => (
          <div key={route.routeId}>
            <Polyline
              positions={route.points.map(p => [p.lat, p.lng])}
              pathOptions={{
                color: route.color,
                weight: 5,
                opacity: route.status === "completed" ? 0.4 : 0.9,
                dashArray: route.status === "scheduled" ? "10 10" : ""
              }}
            />

            <Marker
              position={[route.points[0].lat, route.points[0].lng]}
              icon={truckIcon(route.color)}
            >
              <Popup>
                <b>{route.routeId}</b><br />
                {route.zone}<br />
                {route.distance} · {route.estimatedDuration}<br />
                Efficiency: {route.efficiency}%
              </Popup>
            </Marker>

            {route.points.map(p => (
              <Marker
                key={p.binId}
                position={[p.lat, p.lng]}
                icon={stopIcon(p.order, route.color)}
              >
                <Popup>
                  Stop {p.order}<br />{p.binId}
                </Popup>
              </Marker>
            ))}
          </div>
        ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        background: "white",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0,0,0,.15)",
        fontSize: "13px"
      }}>
        <div><span style={{ color: "#f59e0b" }}>—</span> Scheduled</div>
        <div><span style={{ color: "#10b981" }}>—</span> In Progress</div>
        <div><span style={{ color: "#94a3b8" }}>—</span> Completed</div>
      </div>
    </div>
  )
}