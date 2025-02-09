"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import Loading from "@/components/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, CarFrontIcon, ForkliftIcon, SquareAsteriskIcon } from "lucide-react";

export default function SmartRoadSafetyPage() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const router = useRouter();

  const handleFileUpload = (uploadedFiles) => {
    if (uploadedFiles.length > 0) {
      setFile(uploadedFiles[0]);
      toast.success("Video uploaded successfully!");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a video.");
      return;
    }

    setProcessing(true);
    setShowSkeleton(true);
    setRiskData(null);
    const API_URL_DEPLOY = process.env.NEXT_PUBLIC_ML_API_URL;

    // Call ML API independently
    let mlAnalysis;
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("username", JSON.stringify("temp2"));
      const mlResponse = await fetch(`${API_URL_DEPLOY}/analyzeVideo`, {
        method: "POST",
        body: formData,
      });
      if (mlResponse.ok) {
        mlAnalysis = await mlResponse.json();
      } 
    //   else {
    //     throw new Error("ML API failed with status " + mlResponse.status);
    //   }
    } catch (error) {
      console.error("ML API call error:", error);
      mlAnalysis = { message: "Demo ML analysis" };
      toast.warning("ML API failed, using demo ML analysis.");
    }
    console.log("ML Analysis result:", mlAnalysis);

    // Call Risk Data API independently
    let riskDataResponse;
    try {
      const riskResponse = await fetch("http://127.0.0.1:8000/get", {
        method: "POST",
      });
      if (riskResponse.ok) {
        riskDataResponse = await riskResponse.json();
      } 
    //   else {
    //     throw new Error("Risk data API failed with status " + riskResponse.status);
    //   }
    } catch (error) {
      console.error("Risk data API call error:", error);
      riskDataResponse = {
        rash: { "2025-02-08": 15 },
        rear: { "2025-02-08": 10 },
      };
      toast.warning("Risk data API failed, using demo risk data.");
    }

    setRiskData(riskDataResponse);
    toast.success("Analysis completed successfully!");
    setProcessing(false);
    setTimeout(() => setShowSkeleton(false), 4000);
  };

  const averageRisk =
    riskData && riskData.rash && riskData.rear
      ? (riskData.rash["2025-02-08"] + riskData.rear["2025-02-08"]) / 2
      : 0;

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Smart Road Safety Analysis
      </h2>
      <div className="mb-4">
        <FileUpload onChange={handleFileUpload} accept="video/*" />
      </div>
      {/* Video preview */}
      {file && (
        <div className="mt-4">
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-full max-h-96 mx-auto rounded-md shadow-lg"
          />
        </div>
      )}
      <div className="flex justify-center">
        <Button onClick={handleAnalyze} className="mt-4 px-8 py-3 rounded-md">
          Analyze
        </Button>
      </div>

      {processing && (
        <Card className="mt-6 shadow-lg border border-blue-500 animate-pulse">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Loading />
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Processing video... Please wait
            </p>
          </CardContent>
        </Card>
      )}

      {showSkeleton && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      )}

      {riskData && (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-2xl flex items-center justify-between bg-gradient-to-r
                from-pink-50
                via-red-50
                to-yellow-50
                background-animate hover:border-primary">
            <div>
                <h2 className="text-sm">Front Risk</h2>
                <h2 className="font-bold text-2xl">
                {riskData.rash["2025-02-08"]}
                </h2>
            </div>
                <CarFrontIcon className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-2xl flex items-center justify-between bg-gradient-to-r
                from-pink-50
                via-red-50
                to-yellow-50
                background-animate hover:border-primary">
            <h2 className="text-sm">Rear Risk</h2>
            <h2 className="font-bold text-2xl">
              {riskData.rear["2025-02-08"]}
            </h2>
            <ForkliftIcon className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-2xl flex items-center justify-between bg-gradient-to-r
                from-pink-50
                via-red-50
                to-yellow-50
                background-animate hover:border-primary">
            <h2 className="text-sm">Average Risk</h2>
            <h2 className="font-bold text-2xl">
              {averageRisk}
            </h2>
            <SquareAsteriskIcon className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      )}
    </div>
  );
}