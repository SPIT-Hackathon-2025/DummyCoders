// // "use client";

// // import { TrendingUp } from "lucide-react";
// // import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // const chartData = [
// //   { month: "January", desktop: 186,  },
// //   { month: "February", desktop: 305,  },
// //   { month: "March", desktop: 237,  },
// //   { month: "April", desktop: 73,  },
// //   { month: "May", desktop: 209,  },
// //   { month: "June", desktop: 214,  },
// // ];

// // const chartConfig = {
// //   desktop: {
// //     label: "Desktop",
// //     color: "hsl(var(--chart-1))",
// //   },
// //   mobile: {
// //     label: "Mobile",
// //     color: "hsl(var(--chart-2))",
// //   },
// // };

// // const BarChartComponent = () => {
// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Bar Chart - Multiple</CardTitle>
// //         <CardDescription>January - June 2024</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <ChartContainer config={chartConfig}>
// //           <BarChart data={chartData}>
// //             <CartesianGrid vertical={false} />
// //             <XAxis
// //               dataKey="month"
// //               tickLine={false}
// //               tickMargin={10}
// //               axisLine={false}
// //               tickFormatter={(value) => value.slice(0, 3)}
// //             />
// //             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
// //             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
// //             <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
// //           </BarChart>
// //         </ChartContainer>
// //       </CardContent>
// //       <CardFooter className="flex-col items-start gap-2 text-sm">
// //         <div className="flex gap-2 font-medium leading-none">
// //           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
// //         </div>
// //         <div className="leading-none text-muted-foreground">
// //           Showing total visitors for the last 6 months
// //         </div>
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // export default BarChartComponent;













// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// // ✅ Function to generate dynamic date-wise data
// const currentDate = 90;
// const generateDrowsinessData = (days = 7) => {
//   const data = [];
//   for (let i = 0; i < days; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() - i); // Get previous dates
//     data.unshift({ 
//       date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
//       drowsiness: Math.floor(Math.random() * 500) + 100 // Random drowsiness seconds
//     });
//   }
//   return data;
// };




// const chartData = generateDrowsinessData(7); // Last 7 days

// const chartConfig = {
//   drowsiness: {
//     label: "Drowsiness (seconds)",
//     color: "hsl(var(--chart-1))",
//   },
// };

// const DailyDrowsinessBarChart = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Daily Drowsiness Analysis</CardTitle>
//         <CardDescription>Tracking drowsiness (in seconds) for the last 7 days</CardDescription>
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
//               tickFormatter={(value) => value.slice(5)} // Show only MM-DD
//             />
//             <YAxis />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
//             <Bar dataKey="drowsiness" fill="var(--color-drowsiness)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Drowsiness increased by 3% today <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Daily tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default DailyDrowsinessBarChart;













"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect,useState } from "react";



const DailyDrowsinessBarChart = () => {

  const [drowsinessValue, setDrowsinessValue] = useState(0);

  useEffect(() => {
    fetchDrowsinessValue();
  }, []);
  // / ✅ Static date-wise data with last date as current date (90) and previous dates decrementing one by one
const chartData = [
  { date: "3/2/25", drowsiness: 10 },
  { date: "4/2/25", drowsiness: 50 },
  { date: "5/2/25", drowsiness: 20 },
  { date: "6/2/25", drowsiness: 30 },
  { date: "7/2/25", drowsiness: 50 },
  { date: "8/2/25", drowsiness:  16},
  { date: "9/2/25", drowsiness: drowsinessValue },
];

const chartConfig = {
  drowsiness: {
    label: "Drowsiness (seconds)",
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
      
      setDrowsinessValue(data.drowsy['2025-02-09']);

      console.log("Data fetched:", data.drowsy['2025-02-09']);

      // setDrowsinessValue(data.drowsinessValue || 0); // Ensure a default value
    } catch (error) {
      console.error("Error fetching drowsiness value:", error);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Drowsiness Analysis</CardTitle>
        <CardDescription>Tracking drowsiness (in seconds) for the last 7 days</CardDescription>
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
            <Bar dataKey="drowsiness" fill="var(--color-drowsiness)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Drowsiness increased by 3% today <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Daily tracking from {chartData[0].date} to {chartData[chartData.length - 1].date}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DailyDrowsinessBarChart;


