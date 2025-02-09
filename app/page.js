// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";

// const MapComponent = dynamic(() => import("../components/MapComponent"), { ssr: false });

// export default function Home() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [destinationInput, setDestinationInput] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
//       () => setError("Failed to get user location.")
//     );
//   }, []);

//   const fetchDestinationCoordinates = async () => {
//     setError(null);
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${destinationInput}`
//       );

//       if (response.data && response.data.length > 0) {
//         setDestination([parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]);
//       } else {
//         setError("Location not found.");
//       }
//     } catch (error) {
//       setError("Error fetching destination.");
//       console.error(error);
//     }
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
//         <input
//           type="text"
//           placeholder="Enter destination address"
//           value={destinationInput}
//           onChange={(e) => setDestinationInput(e.target.value)}
//           style={{ padding: 10, fontSize: 16 }}
//         />
//         <button onClick={fetchDestinationCoordinates} style={{ padding: 10, marginLeft: 5 }}>
//           Go
//         </button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {userLocation ? (
//         <MapComponent userLocation={userLocation} destination={destination} />
//       ) : (
//         <p>Fetching location...</p>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

import { NotepadTextIcon } from "lucide-react";
import MagicCard from "@/components/ui/magic-card";
import Cards from "@/components/Cards/Cards";
import { TractorIcon } from "lucide-react";
import Loading from "@/components/loading";

const DashboardPage = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 w-full gap-6 m-2 lg:p-8">
      <div className="flex flex-col md:col-span-1 xl:col-span-4 gap-6 w-full">
        <div className="flex flex-col items-center justify-center w-full border border-border/60 transition-all hover:border-primary bg-gray-50 hover:shadow-md rounded-xl py-6 md:py-8">
          <div className="w-20 h-20 mx-auto">
            <Image
              src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybm5tenBCZk9hZXJVUXk2eTNuOTlZSlRTZ3MifQ"
              alt="Karan"
              width={1024}
              height={1024}
              className="rounded-full w-full h-full"
            />
          </div>
          <h4 className="text-lg font-medium mt-4">
            Karan Gulve
          </h4>
        </div>
        <Card className="p-4 bg-gray-50 hover:shadow-md rounded-xl border hover:border-primary">
          {/* <GoogleTranslate /> */}
        </Card>
        <Card className="bg-gray-50 hover:shadow-md rounded-xl border hover:border-primary">
          <div className="grid grid-cols-1 w-full p-2 relative z-0">
            {/* <MapComponent /> */}
            MapComponent
          </div>
        </Card>
      </div>
      <div className="flex flex-col md:col-span-1 xl:col-span-8 gap-8  ">
        <div className="z-10">
          {/* <Cards /> */}
          Cards
        </div>
        
        {/* <MagicUIComponent /> */}
        MagicUIComponent
        <p className="text-lg p-1 font-semibold -mb-4 text-purple-600">KrishiMitra: Your Smart Agriculture Assistant</p>
        <Card className="border hover:border-primary">
          <div className="grid grid-cols-1 w-full">
            {/* <Chatbot /> */}
            Chatbot
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;