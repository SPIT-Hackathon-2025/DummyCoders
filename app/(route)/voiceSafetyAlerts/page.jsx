
"use client";

import { useState, useRef, useEffect,memo } from "react";
import { FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";
import { MdWarning, MdCarCrash } from "react-icons/md";
import AreaChartComponent from "@/components/areaChart";

const Page = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);
  const [alerts, setAlerts] = useState(0);

  const analyticsData = {
    averageVelocity: 65.5,
    frontWarnings: 12,
    rearWarnings: 8,
    averageWarnings: 10,
  };
useEffect(() => { 
  fetchDrowsinessValue();
}, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);


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
      
      setAlerts(data.pot_holes['2025-02-09']);

      console.log("Data fetched:", data.pot_holes['2025-02-09']);

      // setDrowsinessValue(data.drowsinessValue || 0); // Ensure a default value
    } catch (error) {
      console.error("Error fetching drowsiness value:", error);
    }
  };


  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen(); // Firefox
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen(); // Chrome, Safari, and Opera
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen(); // IE/Edge
      }
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

  // const KPICard = ({ title, value, icon: Icon, color }) => (
  //   <div className={`p-6 rounded-xl shadow-lg ${color} transform transition-transform hover:scale-105`}>
  //     <div className="flex items-center justify-between">
  //       <div>
  //         <h3 className="text-gray-100 text-sm font-medium mb-1">{title}</h3>
  //         <p className="text-white text-2xl font-bold">{value}</p>
  //       </div>
  //       <Icon className="text-white text-3xl opacity-80" />
  //     </div>
  //   </div>
  // );


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
        {/* Video Section */}
        <div className=" p-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden ">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center ">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full border"
                  onTimeUpdate={handleTimeUpdate}
                  src="/demo1.mp4"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:text-blue-400 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>

                    {/* Seek Bar */}
                    <div className="flex-1 h-1 bg-gray-600 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Mute Button */}
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-blue-400 transition-colors"
                      aria-label="Mute"
                    >
                      {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>

                    {/* Volume Control */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={changeVolume}
                      className="w-16"
                    />

                    {/* Playback Speed */}
                    <select
                      value={playbackRate}
                      onChange={changePlaybackRate}
                      className="text-white bg-black border border-gray-500 rounded px-2 py-1"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="1">1x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>

                    {/* Fullscreen Button */}
                    <button
                      onClick={handleFullscreen}
                      className="text-white hover:text-blue-400 transition-colors"
                      aria-label="Fullscreen"
                    >
                      <FaExpand size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-fit w-full">
          <KPICard
            title="pothole count"
            value={`${alerts}`}
            icon={BiTachometer}
            color="bg-gradient-to-br from-blue-500 to-blue-600  h-fit-content"
          />
          <AreaChartComponent />
          {/* <KPICard
            title="Front Warnings"
            value={analyticsData.frontWarnings}
            icon={MdWarning}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <KPICard
            title="Rear Warnings"
            value={analyticsData.rearWarnings}
            icon={MdCarCrash}
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
          <KPICard
            title="Average Warnings"
            value={analyticsData.averageWarnings}
            icon={MdWarning}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
