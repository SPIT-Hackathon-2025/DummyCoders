// "use client";

// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import axios from "axios";

// const MAP_CENTER = [19.07283, 72.88261]; // Default center (Mumbai)
// const OPENROUTE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY; // Ensure this is set in .env.local

// const MapComponent = ({ userLocation, destination }) => {
//   const [route, setRoute] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (userLocation && destination) {
//       fetchWalkingRoute(userLocation, destination);
//     }
//   }, [userLocation, destination]);

//   const fetchWalkingRoute = async (start, end) => {
//     setError(null);
//     try {
//       const response = await axios.get(
//         `https://api.openrouteservice.org/v2/directions/foot-walking`,
//         {
//           params: {
//             api_key: OPENROUTE_API_KEY,
//             start: `${start[1]},${start[0]}`, // longitude,latitude
//             end: `${end[1]},${end[0]}`,
//           },
//         }
//       );

//       if (response.data && response.data.routes && response.data.routes.length > 0) {
//         setRoute(response.data.routes[0]);
//       } else {
//         setError("No walking route found between the selected locations.");
//       }
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 403) {
//           setError("API access denied. Check your API key.");
//         } else if (err.response.status === 500) {
//           setError("Server error: Unable to calculate the route.");
//         } else {
//           setError(`Unexpected error: ${err.response.statusText}`);
//         }
//       } else {
//         setError("No response from the server. Check your network connection.");
//       }
//     }
//   };

//   return (
//     <MapContainer center={userLocation || MAP_CENTER} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
//       {userLocation && (
//         <Marker position={userLocation} icon={L.icon({ iconUrl: "/marker1.png", iconSize: [25, 41] })}>
//           <Popup>You are here</Popup>
//         </Marker>
//       )}

//       {destination && (
//         <Marker position={destination} icon={L.icon({ iconUrl: "/marker2.png", iconSize: [25, 41] })}>
//           <Popup>Destination</Popup>
//         </Marker>
//       )}

//       {route && (
//         <Polyline
//           positions={route.geometry.coordinates.map((c) => [c[1], c[0]])}
//           color="blue"
//           weight={5}
//         />
//       )}

//       {error && (
//         <div style={{ position: "absolute", top: 50, left: 10, backgroundColor: "white", padding: 5, color: "red" }}>
//           {error}
//         </div>
//       )}
//     </MapContainer>
//   );
// };

// export default MapComponent;



"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MAP_CENTER = [19.07283, 72.88261]; // Default center (Mumbai)
const OPENROUTE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY; // Ensure this is set in .env.local

const MapComponent = ({ userLocation, destination }) => {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLocation && destination) {
      fetchWalkingRoute(userLocation, destination);
    }
  }, [userLocation, destination]);

  const fetchWalkingRoute = async (start, end) => {
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
        setError("No walking route found between the selected locations.");
      }
    } catch (err) {
      setError("Error fetching walking directions. Please check your API key and network.");
      console.error("Route fetch error:", err);
    }
  };

  return (
    <MapContainer center={userLocation || MAP_CENTER} zoom={14} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {userLocation && (
        <Marker position={userLocation} icon={L.icon({ iconUrl: "/marker1.png", iconSize: [25, 41] })}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={destination} icon={L.icon({ iconUrl: "/marker2.png", iconSize: [25, 41] })}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      {route && (
        <Polyline
          positions={route.map(([lon, lat]) => [lat, lon])} // Convert for Leaflet
          color="blue"
          weight={5}
        />
      )}

      {error && (
        <div style={{ position: "absolute", top: 50, left: 10, backgroundColor: "white", padding: 5, color: "red" }}>
          {error}
        </div>
      )}
    </MapContainer>
  );
};

export default MapComponent;
