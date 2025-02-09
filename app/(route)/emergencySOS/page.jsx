// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { Toaster, toast } from "sonner";

// const SOSButton = () => {
//   const [loading, setLoading] = useState(false);

//   const sendSOS = async () => {
//     setLoading(true);

//     if (!navigator.geolocation) {
//       toast.error("❌ Geolocation is not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const response = await fetch("/api/sos", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ latitude, longitude }),
//           });

//           const result = await response.json();
//           console.log(result);

//           if (response.ok) {
//             toast.success("🚨 SOS Alert Sent Successfully!");
//           } else {
//             toast.error("❌ Failed to send SOS alert.");
//           }
//         } catch (error) {
//           console.error("Error sending SOS:", error);
//           toast.error("❌ An error occurred while sending SOS.");
//         }

//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching location:", error);
//         toast.error("❌ Failed to retrieve location.");
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <>
//       <Toaster richColors position="top-right" />
//       <Card className="max-w-md mx-auto mt-10 shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-center text-red-500">Emergency SOS Alert</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center">
//           <p className="text-sm text-gray-600 mb-4 text-center">
//             Press the button below to send an emergency alert with your location.
//           </p>
//           <Button
//             onClick={sendSOS}
//             disabled={loading}
//             className="w-full bg-red-500 hover:bg-red-600 text-white"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "🚨 Send SOS Alert"}
//           </Button>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default SOSButton;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, AlertCircle, Phone, MapPin, Info, Shield, Bell } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const SOSPage = () => {
  const [loading, setLoading] = useState(false);

  const sendSOS = async () => {
    setLoading(true);

    if (!navigator.geolocation) {
      toast.error("❌ Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch("/api/sos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const result = await response.json();
          console.log(result);

          if (response.ok) {
            toast.success("🚨 SOS Alert Sent Successfully!");
          } else {
            toast.error("❌ Failed to send SOS alert.");
          }
        } catch (error) {
          console.error("Error sending SOS:", error);
          toast.error("❌ An error occurred while sending SOS.");
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error fetching location:", error);
        toast.error("❌ Failed to retrieve location.");
        setLoading(false);
      }
    );
  };

  const emergencyContacts = [
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "108" },
    { name: "Fire Department", number: "101" },
    { name: "Poison Control", number: "1800-425-1213" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <Toaster richColors position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is an emergency service. Only use in genuine emergency situations.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-red-100 dark:border-red-900 flex-1 hover:border-red-500">
              <CardHeader>
                <CardTitle className="text-center text-red-500 flex items-center justify-center gap-2">
                  <Bell className="h-6 w-6 animate-bounce" />
                  Emergency SOS Alert
                </CardTitle>
                <CardDescription className="text-center">
                  Immediate assistance will be dispatched to your location
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                  Press the button below to send an emergency alert with your location.
                </p>
                <Button
                  onClick={sendSOS}
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                  size="lg"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      🚨 Send SOS Alert
                      <MapPin className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg flex-1 items-center  hover:border-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium">{contact.name}</span>
                      <span className="text-blue-500">{contact.number}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-sm  hover:border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-500" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does the SOS alert work?</AccordionTrigger>
                  <AccordionContent>
                    When you press the SOS button, your current location is securely sent to emergency
                    services. They will dispatch the nearest available help to your location.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What information is shared?</AccordionTrigger>
                  <AccordionContent>
                    Your exact GPS coordinates, timestamp, and device information are shared with
                    emergency responders to ensure quick and accurate assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What should I do after sending an alert?</AccordionTrigger>
                  <AccordionContent>
                    Stay calm and remain in your location unless it's unsafe. Keep your phone on and
                    accessible. Emergency services will attempt to contact you for additional
                    information.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
        >
          <p className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Your safety is our top priority. This service is monitored 24/7.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SOSPage;