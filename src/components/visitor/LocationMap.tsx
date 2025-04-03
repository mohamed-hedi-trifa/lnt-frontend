import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css";
import "./map.css"

import redIconImg from "../../assets/images/redLocationIcon.png";  

const redIcon = new L.Icon({
  iconUrl: redIconImg,
  iconSize: [25, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});



const LocationMap = ({ event }: { event: any }) => {
  const latitude = event?.latitude;
  const longitude = parseFloat(event.longitude);

  console.log(event)

  return (
    <>
    
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "200px", width: "100%", zIndex: "1" }} zoomControl={false} className="rounded-xl"  >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <Marker position={[latitude, longitude]} icon={redIcon}>
        <Popup>📍 Selected Location</Popup>
      </Marker>
    </MapContainer>
        </>
  );
};

export default LocationMap;
