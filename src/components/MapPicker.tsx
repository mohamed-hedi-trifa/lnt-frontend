import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";

// Define a custom icon
const customIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // URL of the custom icon
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon that corresponds to the marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const MapPicker = ({ onSelectLocation, initialPosition, role } : {onSelectLocation:any, initialPosition:any, role:string}) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [map, setMap] = useState(null); // State to hold the map instance

  // Update position if initialPosition changes
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);

      // If the map instance is available, set the view to the initial position
      // if (map) {
      //   map.setView(initialPosition, 15); // Set the view to the initial position with a zoom level of 6
      // }
    }
  }, [initialPosition, map]);

  const MapClickHandler = () => {
    if (role != 'view')
    {
      useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng;
          setPosition([lat, lng]);
          onSelectLocation(lat, lng); // Pass the selected location to the parent component
        },
      });
    }
 
    return null;
  };

  return (
    <MapContainer
      whenCreated={setMap} // Capture the map instance when it's created
      center={initialPosition} // Default center (will be overridden)
      zoom={6} // Default zoom level (will be overridden)
      style={{ height: "400px", width: "500px", zIndex: "2" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position} icon={customIcon}> {/* Use the custom icon */}
          <Popup>Selected Location</Popup>
        </Marker>
      )}
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapPicker;