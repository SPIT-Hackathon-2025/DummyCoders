"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const MAP_CENTER = [19.07283, 72.88261]; // Default map center (Mumbai)
const OPENROUTE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY; // Set this in .env.local

const LOCATIONS = [
  {
    city: "Pune",
    potholes: [
      { name: "FC Road Pothole", coordinates: [18.5261, 73.8416] },
      { name: "JM Road Pothole", coordinates: [18.5289, 73.8474] },
    ],
    accidentProne: [
      { name: "Kothrud Junction", coordinates: [18.5074, 73.8077], radius: 300 },
      { name: "Swargate Signal", coordinates: [18.5018, 73.8629], radius: 500 },
      { name: "Lonavala Bypass", coordinates: [18.7481, 73.4070], radius: 400 },
      { name: "Khandala Ghat section", coordinates: [18.7705, 73.3762], radius: 500 },
    ],
  },
  {
    "city": "Dadar",
    "potholes": [
      {
        "name": "Kismat Junction Pothole",
        "coordinates": [19.0176, 72.8421]
      },
      {
        "name": "Dadar TT Flyover Pothole",
        "coordinates": [19.0196, 72.8553]
      }
    ],
    "accidentProne": [
      {
        "name": "Wanjawadi",
        "coordinates": [19.037724, 72.842119],
        "radius": 200
      },
      {
        "name": "Kevni Pada",
        "coordinates": [19.127704, 72.846730],
        "radius": 100
      }
    ]
  },  
  {
    city: "Andheri",
    potholes: [
      { name: "Lokhandwala Backroad", coordinates: [19.1344, 72.8407] },
      { name: "Versova Circle", coordinates: [19.1399, 72.8281] },
    ],
    accidentProne: [
      { name: "Western Express Highway", coordinates: [19.1203, 72.8464], radius: 400 },
      { name: "Andheri Metro Station", coordinates: [19.1184, 72.8469], radius: 350 },
    ],
  },
];

const MapComponent = () => {
  const [destination, setDestination] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const userIcon = L.icon({ iconUrl: "/marker1.png", iconSize: [40, 40] });
  const potholeIcon = L.icon({ iconUrl: "https://tse2.mm.bing.net/th?id=OIP.aZ2YQKPDfXsXBXqUMRTtTAHaHa&pid=Api&P=0&h=180", iconSize: [30, 30] });
  const destinationIcon = L.icon({ iconUrl: "/marker1.png", iconSize: [40, 40] });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (err) => {
        console.error("Error fetching location:", err);
        setError("Unable to fetch your location. Please enable location services.");
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation && selectedCity) {
      fetchRoute(userLocation, selectedCity.center);
    }
  }, [userLocation, selectedCity]);

  const fetchRoute = async (start, end) => {
    setError(null);
    try {
      const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
        {
          coordinates: [
            [start[1], start[0]], // Longitude, Latitude
            [end[1], end[0]],
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.features.length > 0) {
        setRoute(response.data.features[0].geometry.coordinates);
      } else {
        setError("No route found between the selected points.");
      }
    } catch (err) {
      setError("Error fetching route. Please check your API key and network.");
      console.error("Route fetch error:", err);
    }
  };

  const handleSearch = () => {
    const cityData = LOCATIONS.find(
      (location) => location.city.toLowerCase() === destination.toLowerCase()
    );
    if (cityData) {
      setSelectedCity({
        ...cityData,
        center: [
          cityData.potholes[0]?.coordinates[0] || MAP_CENTER[0],
          cityData.potholes[0]?.coordinates[1] || MAP_CENTER[1],
        ],
      });
      setError(null);
    } else {
      alert("City no  t found. Try Pune or Andheri.");
      setSelectedCity(null);
    }
  };

  return (
    <div className="">
      {/* Search input */}
      <div className="p-4 bg-gray-200 flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Enter destination city (e.g., Pune, Andheri)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="px-4 py-2 border border-gray-400"
        />
        <Button
          onClick={handleSearch}
          className="bg-primary text-white px-4 py-1"
        >
          Search
        </Button>
      </div>

      {/* Map */}
      <MapContainer
        center={MAP_CENTER}
        zoom={13}
        style={{ height: "80vh", width: "100%",}}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Destination marker */}
        {selectedCity && (
          <Marker position={selectedCity.center} icon={destinationIcon}>
            <Popup>Destination: {selectedCity.city}</Popup>
          </Marker>
        )}

        {/* Pothole markers */}
        {selectedCity &&
          selectedCity.potholes.map((pothole, index) => (
            <Marker
              key={`pothole-${index}`}
              position={pothole.coordinates}
              icon={potholeIcon}
            >
              <Popup>{pothole.name}</Popup>
            </Marker>
          ))}

        {/* Accident-prone area circles */}
        {selectedCity &&
          selectedCity.accidentProne.map((area, index) => (
            <Circle
              key={`accident-${index}`}
              center={area.coordinates}
              radius={area.radius} // Radius in meters
              pathOptions={{
                color: "red",
                fillColor: "darkred",
                fillOpacity: 0.4,
              }}
            >
              <Popup>{area.name}</Popup>
            </Circle>
          ))}

        {/* Route */}
        {route && (
          <Polyline
            positions={route.map(([lon, lat]) => [lat, lon])} // Convert coordinates for Leaflet
            color="blue"
            weight={5}
          />
        )}

        {/* Error display */}
        {error && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "white",
              padding: "5px",
              color: "red",
            }}
          >
            {error}
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;


// // MapComponent.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import axios from "axios";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Toaster, toast } from "sonner";

// const MAP_CENTER = [19.07283, 72.88261];
// const OPENROUTE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY;

// const MapComponent = ({ userLocation, destination }) => {
//   const [route, setRoute] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (userLocation && destination) {
//       fetchRoute(userLocation, destination);
//     }
//   }, [userLocation, destination]);

//   const fetchRoute = async (start, end) => {
//     setError(null);
//     try {
//       const response = await axios.post(
//         "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
//         {
//           coordinates: [
//             [start[1], start[0]],
//             [end[1], end[0]],
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${OPENROUTE_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data && response.data.features.length > 0) {
//         setRoute(response.data.features[0].geometry.coordinates);
//       } else {
//         setError("No route found.");
//       }
//     } catch (err) {
//       setError("Error fetching route.");
//       console.error("Route fetch error:", err);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-6 shadow-lg">
//       <Toaster richColors position="top-right" />
//       <CardHeader>
//         <CardTitle className="text-center text-blue-600">Live Map</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <MapContainer center={MAP_CENTER} zoom={13} style={{ height: "75vh", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           {userLocation && (
//             <Marker position={userLocation} icon={L.icon({ iconUrl: "/marker1.png", iconSize: [40, 40] })}>
//               <Popup>Your Location</Popup>
//             </Marker>
//           )}

//           {destination && (
//             <Marker position={destination} icon={L.icon({ iconUrl: "/marker1.png", iconSize: [40, 40] })}>
//               <Popup>Destination</Popup>
//             </Marker>
//           )}

//           {route && (
//             <Polyline positions={route.map(([lon, lat]) => [lat, lon])} color="blue" weight={5} />
//           )}

//           {error && toast.error(error)}
//         </MapContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default MapComponent;