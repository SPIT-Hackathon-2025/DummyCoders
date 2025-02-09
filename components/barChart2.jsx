// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // ✅ Updated dataset for dayly average warnings
// const chartData = [
//   { day: "day 1", warnings: 15 },
//   { day: "day 2", warnings: 22 },
//   { day: "day 3", warnings: 18 },
//   { day: "day 4", warnings: 25 },
//   { day: "day 5", warnings: 20 },
//   { day: "day 6", warnings: 23 },
// ];

// // ✅ Updated chart configuration (for warnings)
// const chartConfig = {
//   warnings: {
//     label: "Warnings",
//     color: "hsl(var(--chart-1))",
//   },
// };

// const daylyWarningsBarChart = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Average Warnings</CardTitle>
//         <CardDescription>Tracking warnings per day for the last 6 days</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart data={chartData}>
//             <CartesianGrid vertical={false} />
//             {/* ✅ Changed "month" to "day" for X-axis */}
//             <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
//             <YAxis />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
//             {/* ✅ Updated dataKey to "warnings" */}
//             <Bar dataKey="warnings" fill="var(--color-warnings)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Warnings increased by 5.2% this day <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           daily Data: Last 6 days
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default daylyWarningsBarChart;










// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // ✅ Function to generate last 6 days' data dynamically
// const generateWarningsData = (days = 6) => {
//   const data = [];
//   for (let i = 0; i < days - 1; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() - i); // Get previous dates
//     data.unshift({
//       date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
//       warnings: Math.floor(Math.random() * 50) + 1, // Random warnings (1-50)
//     });
//   }
//   // Add the 6th value with warnings set to 65.5
//   const date = new Date();
//   date.setDate(date.getDate() - (days - 1));
//   data.unshift({
//     date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
//     warnings: 65.5,
//   });
//   return data;
// };

// const chartData = generateWarningsData(6); // Last 6 days

// const chartConfig = {
//   warnings: {
//     label: "Warnings",
//     color: "hsl(var(--chart-1))",
//   },
// };

// const DailyWarningsBarChart = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Average Velocity</CardTitle>
//         <CardDescription>Tracking warnings per day for the last 6 days</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart data={chartData}>
//             <CartesianGrid vertical={false} />
//             {/* ✅ X-Axis now uses real dates (MM-DD format) */}
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(5)} // Show only MM-DD
//             />
//             <YAxis />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
//             <Bar dataKey="warnings" fill="var(--color-warnings)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Warnings increased by 5.2% this week <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default DailyWarningsBarChart;


"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// ✅ Generate random warnings between 20 and 70 for the first 6 days
const generateRandomWarnings = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const chartData = [
  { date: "03/02/25", warnings: generateRandomWarnings(20, 70) },
  { date: "04/02/25", warnings: generateRandomWarnings(20, 70) },
  { date: "05/02/25", warnings: generateRandomWarnings(20, 70) },
  { date: "06/02/25", warnings: generateRandomWarnings(20, 70) },
  { date: "07/02/25", warnings: generateRandomWarnings(20, 70) },
  { date: "08/02/25", warnings: generateRandomWarnings(20, 70) },
  { date: "09/02/25", warnings: 65.5 }, // Last value set to 65.5
];

const chartConfig = {
  warnings: {
    label: "Warnings",
    color: "hsl(var(--chart-1))",
  },
};

const DailyWarningsBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Average Velocity</CardTitle>
        <CardDescription>Tracking warnings per day for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
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
            <Bar dataKey="warnings" fill="var(--color-warnings)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Warnings increased by 3% today <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Daily tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DailyWarningsBarChart;