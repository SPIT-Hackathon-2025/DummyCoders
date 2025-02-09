


// "use client";

// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // ✅ Updated dataset for daily pothole counts
// const chartData = [
//   { day: "day 1", potholes: 5 },
//   { day: "day 2", potholes: 8 },
//   { day: "day 3", potholes: 12 },
//   { day: "day 4", potholes: 6 },
//   { day: "day 5", potholes: 10 },
//   { day: "day 6", potholes: 7 },
//   { day: "day 7", potholes: 9 },
// ];

// // ✅ Updated chart configuration (for potholes)
// const chartConfig = {
//   potholes: {
//     label: "Potholes",
//     color: "hsl(var(--chart-1))",
//   },
// };

// const DailyPotholeAreaChart = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Pothole Count</CardTitle>
//         <CardDescription>Tracking detected potholes each day of the week</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             {/* ✅ Changed "month" to "day" for X-axis */}
//             <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
//             <YAxis />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
//             {/* ✅ Updated dataKey to "potholes" */}
//             <Area
//               dataKey="potholes"
//               type="monotone"
//               fill="var(--color-potholes)"
//               fillOpacity={0.4}
//               stroke="var(--color-potholes)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//               Pothole detections increased by 3% this week <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//               Weekly Data: Monday - Sunday
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default DailyPotholeAreaChart;
















"use client";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// ✅ Function to generate last 7 days' data dynamically
// const generatePotholeData = (days = 7) => {
//   const data = [];
//   for (let i = 0; i < days; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() - i); // Get previous dates
//     data.unshift({
//       date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
//       potholes: Math.floor(Math.random() * 20) + 1, // Random potholes (1-20)
//     });
//   }
//   return data;
// };

// const chartData = generatePotholeData(7); // Last 7 days



const DailyPotholeAreaChart = () => {
  
  const [alerts, setAlerts] = useState(0);
  
  useEffect(() => { 
    fetchDrowsinessValue();
  }, []);
  
  
  const chartData = [
    { day: "3/2/25", potholes: 5 },
    { day: "4/2/25", potholes: 54 },
    { day: "5/2/25", potholes: 12 },
    { day: "6/2/25", potholes: 61 },
    { day: "7/2/25", potholes: 10 },
    { day: "8/2/25", potholes: 7 },
    { day: "9/2/25", potholes: alerts },
  ];
  
  const chartConfig = {
    potholes: {
      label: "Potholes",
      color: "hsl(var(--chart-1))",
    },
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Pothole Count</CardTitle>
        <CardDescription>Tracking detected potholes each day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            {/* ✅ X-Axis now uses real dates (MM-DD format) */}
            <XAxis
  dataKey="day" // Corrected from "date" to "day"
  tickLine={false}
  axisLine={false}
  tickMargin={8}
/>

            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            {/* ✅ Updated dataKey to "potholes" */}
            <Area
              dataKey="potholes"
              type="monotone"
              fill="var(--color-potholes)"
              fillOpacity={0.4}
              stroke="var(--color-potholes)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Pothole detections increased by 3% this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DailyPotholeAreaChart;

