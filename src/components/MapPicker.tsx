import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./mapPicker.css"

const customIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", 
  iconSize: [25, 41],
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
});

const MapPicker = ({ onSelectLocation, initialPosition, role } : {onSelectLocation:any, initialPosition:any, role:string}) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [map, setMap] = useState(null);


  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);


    }
  }, [initialPosition, map]);

  const MapClickHandler = () => {
    if (role != 'view')
    {
      useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng;
          setPosition([lat, lng]);
          onSelectLocation(lat, lng); 
        },
      });
    }
 
    return null;
  };

  return (
    <MapContainer
      whenCreated={setMap} 
      center={initialPosition} 
      zoom={10} 
      style={{ height: "400px", width: "500px", zIndex: "2" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position} icon={customIcon}> 
          <Popup>Selected Location</Popup>
        </Marker>
      )}
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapPicker;