import { IoHomeOutline } from "react-icons/io5";
  import { HeartPulse } from 'lucide-react';
  import { SiSimpleanalytics } from "react-icons/si";
  import { MdOutlineHealthAndSafety } from "react-icons/md";
  import { MdManageHistory } from "react-icons/md";
  import { TbHeartRateMonitor } from "react-icons/tb";
  import { FaBedPulse } from "react-icons/fa6";

  import { PiPlant } from "react-icons/pi";
  import { IoAnalytics } from "react-icons/io5";

  // Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";


export const cardsData = [
  {
    title: "Market Crop Prices",
    key: 1,
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 90,
    value: "Analyzing Crop Market Trends",
    // png: CropIcon, // Assuming you have a crop-related icon
    png:   PiPlant, // Assuming you have a heart rate icon
    series: [
      {
        name: "Wheat",
        data: [4500, 4800, 5000, 4900, 5100, 5000, 5200], // Example data from API
      },
      {
        name: "Rice",
        data: [4000, 4200, 4300, 4400, 4300, 4500, 4600], // Example data from API
      },
      {
        name: "Potato",
        data: [2000, 4200, 3300, 4400, 4300, 2500, 4600], // Example data from API
      },
      {
        name: "Tomato",
        data: [3000, 4200, 3300, 4400, 4300, 4100, 1600], // Example data from API
      },
      // {
      //   name: "Cotton",
      //   data: [3000, 4200, 4300, 4400, 5300, 4500, 4600], // Example data from API
      // },
    ],
  },
  {
    title: "Farm Health",
    key: 2,
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 70,
    value: "Monitoring Soil Nutrient Health",
    // png: NPKIcon, // Assuming a farm/soil icon
    png:   HeartPulse, // Assuming you have a heart rate icon
    series: [
      {
        name: "NPK Values",
        data: [120, 80, 100,60,120,45,78], // Manual NPK data
      },
    ],
  },
  {
    title: "Investment vs Profit",
    key: 3,
    color: {
      backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 75,
    value: "Tracking Financial Growth",
    // png: InvestmentIcon, // Assuming an investment/profit icon
    png:   IoAnalytics, // Assuming you have a heart rate icon
    series: [
      {
        name: "Investment",
        data: [210, 250, 220, 240, 260, 280, 300], // Investment in thousands
      },
      {
        name: "Profit",
        data: [300, 320, 340, 330, 350, 360, 370], // Profit in thousands
      },
    ],
  },
];