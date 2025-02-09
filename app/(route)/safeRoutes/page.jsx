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
                <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }} className="border borderoutline-gray-500">
                    <input
                        type="text"
                        placeholder="Enter destination address"
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        style={{ padding: 10, fontSize: 16 }}
                    />
                    <button onClick={fetchDestinationCoordinates} style={{ padding: 10, marginLeft: 5 }}>
                        Go
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
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