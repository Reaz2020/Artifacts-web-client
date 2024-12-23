import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const artifacts = [
  {
    _id: "1",
    artifactName: "Ancient Egyptian Sphinx",
    latitude: 29.9753,
    longitude: 31.1376,
    discoveredAt: "Giza, Egypt",
    description: "A monumental sculpture representing a sphinx, dating back to 2500 BC.",
  },
  {
    _id: "2",
    artifactName: "Terracotta Warriors",
    latitude: 34.3847,
    longitude: 109.2788,
    discoveredAt: "Xi'an, China",
    description: "A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.",
  },
  {
    _id: "3",
    artifactName: "Stonehenge",
    latitude: 51.1789,
    longitude: -1.8262,
    discoveredAt: "Wiltshire, England",
    description: "A prehistoric monument of massive standing stones arranged in a circle.",
  },
  {
    _id: "4",
    artifactName: "Machu Picchu",
    latitude: -13.1631,
    longitude: -72.5450,
    discoveredAt: "Cusco Region, Peru",
    description: "An Incan citadel set high in the Andes Mountains.",
  },
  {
    _id: "5",
    artifactName: "Moai Statues",
    latitude: -27.1212,
    longitude: -109.3664,
    discoveredAt: "Easter Island, Chile",
    description: "Monolithic human figures carved by the Rapa Nui people.",
  },
  {
    _id: "6",
    artifactName: "Acropolis of Athens",
    latitude: 37.9715,
    longitude: 23.7267,
    discoveredAt: "Athens, Greece",
    description: "An ancient citadel on a rocky outcrop above the city of Athens.",
  },
  {
    _id: "7",
    artifactName: "Great Wall of China",
    latitude: 40.4319,
    longitude: 116.5704,
    discoveredAt: "Beijing, China",
    description: "A series of fortifications built across northern China to protect against invasions.",
  },
];

const InteractiveMap = () => {
  return (
    <div className="map-container" style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {artifacts.map((artifact) => (
          <Marker key={artifact._id} position={[artifact.latitude, artifact.longitude]}>
            <Popup>
              <div>
                <h3>{artifact.artifactName}</h3>
                <p><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
                <p><strong>Description:</strong> {artifact.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
