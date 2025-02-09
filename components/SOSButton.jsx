"use client";
import { useState } from "react";

export default function SOSButton() {
  const [loading, setLoading] = useState(false);

  const sendSOS = async () => {
    setLoading(true);
    const response = await fetch("/api/sos", { method: "POST" });
    const data = await response.json();
    alert(data.message);
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center border h-screen">
      <button
        onClick={sendSOS}
        disabled={loading}
        className={`relative z-10 bg-red-500 text-white font-bold py-2 px-6 rounded-lg overflow-hidden h-44 w-96 mb-32 ${
          loading ? "cursor-not-allowed" : ""
        }`}
      >
        <span className="relative z-20">{loading ? "Sending..." : "Send SOS Alert"}</span>
        {/* Water animation */}
        <div
          className={`absolute inset-0 z-10 rounded-lg ${
            loading ? "animate-flow" : ""
          }`}
        ></div>
      </button>

      {/* CSS for the water animation */}
      <style jsx>{`
        .animate-flow {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.2)
          );
          animation: water-flow 1.5s infinite linear;
        }

        @keyframes water-flow {
          0% {
            background-position: -200%;
          }
          100% {
            background-position: 200%;
          }
        }
      `}</style>
    </div>
  );
}
