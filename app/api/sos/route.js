// import twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// // Initialize Twilio client
// const client = twilio(accountSid, authToken);

// export async function POST(req) {
//   const phoneNumbers = ["+919284669149","+917058830820"]; // Ensure numbers are in E.164 format
//   const results = [];

//   try {
//     // Send SMS to all numbers using Promise.all
//     await Promise.all(
//       phoneNumbers.map(async (number) => {
//         const message = await client.messages.create({
//           body: "🚨 SOS ALERT: Someone nearby needs help! Please assist if possible.",
//           from: process.env.TWILIO_PHONE_NUMBER,
//           to: number,
//         });
//         results.push({ to: number, status: message.status });
//       })
//     );

//     // Return a response including the status for each number
//     return new Response(
//       JSON.stringify({ message: "SOS alerts sent successfully!", results }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("SMS Sending Error:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to send SOS alerts.", details: error.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }












import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const { latitude, longitude } = await req.json(); // Get location from frontend
    const phoneNumbers = ["+919284669149", "+917058830820"];

    // Generate Google Maps link
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const alertMessage = `🚨 SOS ALERT: Someone nearby needs help!\n📍 Location: ${googleMapsLink}`;

    // Send SMS to all numbers
    const results = await Promise.all(
      phoneNumbers.map(async (number) => {
        const message = await client.messages.create({
          body: alertMessage,
          from: twilioPhoneNumber,
          to: number,
        });
        return { to: number, status: message.status };
      })
    );

    return new Response(
      JSON.stringify({ message: "SOS alerts sent successfully!", results }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SMS Sending Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send SOS alerts.", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

