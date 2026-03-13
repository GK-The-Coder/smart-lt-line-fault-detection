import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- Custom Colored Icons ---------- */

const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const redIcon = createIcon("red");
const greenIcon = createIcon("green");
const yellowIcon = createIcon("yellow");

/* ---------- Auto Fit Map to Markers ---------- */

function FitBounds({ poles }) {
  const map = useMap();

  if (poles.length > 0) {
    const bounds = poles.map(p => [p.latitude, p.longitude]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
}

export default function MapView({ poles }) {
  return (
    <div className="h-[450px] w-full rounded-xl overflow-hidden">
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <FitBounds poles={poles} />

        {poles.map((pole) => {
          let icon = greenIcon;

          if (pole.status === "fault") icon = redIcon;
          else if (pole.theftDetected) icon = yellowIcon;

          return (
            <Marker
              key={pole._id || pole.poleId}
              position={[pole.latitude, pole.longitude]}
              icon={icon}
            >
              <Popup>
                <strong>{pole.poleId}</strong><br />
                Status: {pole.status}<br />
                Voltage: {pole.voltage?.toFixed(2)} V<br />
                Current: {pole.current?.toFixed(2)} A
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
