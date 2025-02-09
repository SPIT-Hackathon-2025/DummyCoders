// "use client";

// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// const chartData = [
//   { day: "day 1", warnings: 15 },
//   { day: "day 2", warnings: 22 },
//   { day: "day 3", warnings: 18 },
//   { day: "day 4", warnings: 25 },
//   { day: "day 5", warnings: 20 },
//   { day: "day 6", warnings: 23 },
// ];


// const chartConfig = {
//   desktop: {
//     label: "warnings",
//     color: "hsl(var(--chart-1))",
//   },

// };

// const AreaChartComponent2 = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Average Warnings</CardTitle>
//         <CardDescription>Average number of warnings per day over the last 3 months</CardDescription>
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
//             <XAxis
//               dataKey="day"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
//             {/* <Area
//               dataKey="warnings"
//               type="natural"
//               fill="var(--color-mobile)"
//               fillOpacity={0.4}
//               stroke="var(--color-mobile)"
//               stackId="a"
//             /> */}
//             <Area
//               dataKey="warnings"
//               type="natural"
//               fill="var(--color-desktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//               stackId="a"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//             Warnings increased by 5.2% this day <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//             Daily Data: January - June 2024
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default AreaChartComponent2;













// "use client";

// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // ✅ Function to generate last 7 days' data dynamically
// const generateWarningsData = (days = 7) => {
//   const data = [];
//   for (let i = 0; i < days; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() - i); // Get previous dates
//     data.unshift({
//       date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
//       warnings: Math.floor(Math.random() * 50) + 1, // Random warnings (1-50)
//     });
//   }
//   return data;
// };

// const chartData = generateWarningsData(7); // Last 7 days

// const chartConfig = {
//   warnings: {
//     label: "Warnings",
//     color: "hsl(var(--chart-1))",
//   },
// };

// const AreaChartComponent2 = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Average Warnings</CardTitle>
//         <CardDescription>Tracking the daily warnings over the past 7 days</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
//             <CartesianGrid vertical={false} />
//             {/* ✅ X-Axis now uses real dates (MM-DD format) */}
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(5)} // Show only MM-DD
//             />
//             <YAxis />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
//             <Area
//               dataKey="warnings"
//               type="monotone"
//               fill="var(--color-warnings)"
//               fillOpacity={0.4}
//               stroke="var(--color-warnings)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//               Warnings increased by 5.2% this week <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//               Tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default AreaChartComponent2;




// "use client";

// import { useEffect, useState } from "react";
// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // ✅ Generate random warnings between 20 and 70 for the first 6 days
// const generateRandomWarnings = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// const initialChartData = [
//   { date: "90", warnings: generateRandomWarnings(20, 70) },
//   { date: "89", warnings: generateRandomWarnings(20, 70) },
//   { date: "88", warnings: generateRandomWarnings(20, 70) },
//   { date: "87", warnings: generateRandomWarnings(20, 70) },
//   { date: "86", warnings: generateRandomWarnings(20, 70) },
//   { date: "85", warnings: generateRandomWarnings(20, 70) },
// ];

// const chartConfig = {
//   warnings: {
//     label: "Warnings",
//     color: "hsl(var(--chart-1))",
//   },
// };

// const DailyWarningsBarChart = () => {
//   const [chartData, setChartData] = useState(initialChartData);

//   useEffect(() => {
//     const fetchDrowsinessValue = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/get", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ key: "value" }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();
//         console.log("Data fetched:", data);
        
//         const latestWarning = (data.rear["2025-02-09"] + data.rash["2025-02-08"]) / 2;
//         setChartData([...initialChartData, { date: "84", warnings: latestWarning }]);
//       } catch (error) {
//         console.error("Error fetching drowsiness value:", error);
//       }
//     };

//     fetchDrowsinessValue();
//   }, []);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Average Velocity</CardTitle>
//         <CardDescription>Tracking warnings per day for the last 7 days</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               label={{ value: "Days", position: "insideBottom", dy: 10 }}
//             />
//             <YAxis />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
//             <Bar dataKey="warnings" fill="var(--color-warnings)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Warnings increased by 3% today <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Daily tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default DailyWarningsBarChart;


"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// ✅ Generate random warnings between 20 and 70 for the first 6 days
const generateRandomWarnings = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialChartData = [
  { date: "03/02/25", warnings: generateRandomWarnings(10, 50) },
  { date: "04/02/25", warnings: generateRandomWarnings(10, 50) },
  { date: "05/02/25", warnings: generateRandomWarnings(10, 50) },
  { date: "06/02/25", warnings: generateRandomWarnings(10, 50) },
  { date: "07/02/25", warnings: generateRandomWarnings(10, 40) },
  { date: "08/02/25", warnings: generateRandomWarnings(10, 20) },
];

const chartConfig = {
  warnings: {
    label: "Warnings",
    color: "hsl(var(--chart-1))",
  },
};

const DailyWarningsAreaChart = () => {
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    const fetchDrowsinessValue = async () => {
      try {
        const response = await fetch("http://localhost:8000/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: "value" }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Data fetched:", data);
        
        const latestWarning = (data.rear["2025-02-09"] + data.rash["2025-02-08"]) / 2;
        setChartData([...initialChartData, { date: "09/02/25", warnings: latestWarning }]);
      } catch (error) {
        console.error("Error fetching drowsiness value:", error);
      }
    };

    fetchDrowsinessValue();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Average Velocity</CardTitle>
        <CardDescription>Tracking warnings per day for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              label={{ value: "Days", position: "insideBottom", dy: 10 }}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Area dataKey="warnings" type="monotone" fill="var(--color-warnings)" fillOpacity={0.4} stroke="var(--color-warnings)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Warnings increased by 13% today <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Daily tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DailyWarningsAreaChart;
