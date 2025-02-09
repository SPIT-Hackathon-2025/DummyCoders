
"use client";

import { useState, useRef, useEffect,memo } from "react";
import { FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";
import { MdWarning, MdCarCrash } from "react-icons/md";
import AreaChartComponent from "@/components/areaChart";
import BarChartComponent from "@/components/barChart";
import { database, ref, onValue } from "../../../config/firebaseconfig"

const Page = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [drowsinessValue, setDrowsinessValue] = useState(0);
  const videoRef = useRef(null);

  // Fetch drowsiness data from Flask server
  const fetchDrowsinessValue = async () => {
    try {
      const response = await fetch("http://localhost:8000/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "value" }), // Adjust the body content as needed
      }); // Flask API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Data fetched:", data);
      
      setDrowsinessValue(data.drowsy['2025-02-09']);

      console.log("Data fetched:", data.drowsy['2025-02-09']);

      // setDrowsinessValue(data.drowsinessValue || 0); // Ensure a default value
    } catch (error) {
      console.error("Error fetching drowsiness value:", error);
    }
  };

  // Fetch data on component mount and refresh every 5 seconds
  useEffect(() => {
    fetchDrowsinessValue();
    const interval = setInterval(fetchDrowsinessValue, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
      else if (videoRef.current.mozRequestFullScreen) videoRef.current.mozRequestFullScreen();
      else if (videoRef.current.webkitRequestFullscreen) videoRef.current.webkitRequestFullscreen();
      else if (videoRef.current.msRequestFullscreen) videoRef.current.msRequestFullscreen();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setMuted(newVolume === "0");
  };

  const changePlaybackRate = (e) => {
    const rate = e.target.value;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const KPICard = memo(({ title, value, icon: Icon, color }) => (
    <div className={`p-6 rounded-xl shadow-lg ${color} transform transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-100 text-sm font-medium mb-1">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
        <Icon className="text-white text-3xl opacity-80" />
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full border"
                  onTimeUpdate={handleTimeUpdate}
                  src="/demo1.mp4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    <button onClick={handlePlayPause} className="text-white hover:text-blue-400 transition-colors">
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    <div className="flex-1 h-1 bg-gray-600 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
                      {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>
                    <input type="range" min="0" max="1" step="0.1" value={volume} onChange={changeVolume} className="w-16" />
                    <select value={playbackRate} onChange={changePlaybackRate} className="text-white bg-black border border-gray-500 rounded px-2 py-1">
                      <option value="0.5">0.5x</option>
                      <option value="1">1x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                    <button onClick={handleFullscreen} className="text-white hover:text-blue-400 transition-colors">
                      <FaExpand size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-fit w-full">
          <KPICard title="Drowsiness count" value={drowsinessValue} icon={BiTachometer} color="bg-gradient-to-br from-blue-500 to-blue-600" />
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Page;
