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
      className="h-[300px] sm:w-[350px] w-[300px] z-10 rounded-lg shadow-helmi "     
      // style={{ height: "300px", width: "350px", zIndex: "2", borderRadius: "10px", boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02);" }}
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