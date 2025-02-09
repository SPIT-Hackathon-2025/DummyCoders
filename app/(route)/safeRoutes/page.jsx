"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { Card } from '@/components/ui/card';

const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false });
const page = () => {

    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [destinationInput, setDestinationInput] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
            () => setError("Failed to get user location.")
        );
    }, []);

    const fetchDestinationCoordinates = async () => {
        setError(null);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${destinationInput}`
            );

            if (response.data && response.data.length > 0) {
                setDestination([parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]);
            } else {
                setError("Location not found.");
            }
        } catch (error) {
            setError("Error fetching destination.");
            console.error(error);
        }
    };


    return (
        <div>
            <Card>
                <div style={{ position: "absolute", top: 10, left: 10 }} className="border borderoutline-gray-500">
                    {/* <input
                        type="text"
                        placeholder="Enter destination address"
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        style={{ padding: 10, fontSize: 16 }}
                    />
                    <button onClick={fetchDestinationCoordinates} style={{ padding: 10, marginLeft: 5 }}>
                        Go
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>} */}
                </div>

                {userLocation ? (
                    <MapComponent userLocation={userLocation} destination={destination} />
                ) : (
                    <p>Fetching location...</p>
                )}

            </Card>


        </div>
    )
}

export default page


// // Page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Toaster, toast } from "sonner";

// const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false });

// const Page = () => {
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
//     <div className="w-full flex flex-col items-center p-6">
//       <Toaster richColors position="top-right" />
//       <Card className="w-full max-w-3xl shadow-lg p-4">
//         <CardHeader>
//           <CardTitle className="text-center text-blue-600">Enter Destination</CardTitle>
//         </CardHeader>
//         <CardContent className="flex gap-4">
//           <Input
//             type="text"
//             placeholder="Enter destination address"
//             value={destinationInput}
//             onChange={(e) => setDestinationInput(e.target.value)}
//             className="flex-1"
//           />
//           <Button onClick={fetchDestinationCoordinates} className="bg-blue-500 text-white">
//             Go
//           </Button>
//         </CardContent>
//         {error && toast.error(error)}
//       </Card>
//       {userLocation ? (
//         <MapComponent userLocation={userLocation} destination={destination} />
//       ) : (
//         <p className="mt-4 text-gray-500">Fetching location...</p>
//       )}
//     </div>
//   );
// };

// export default Page;
