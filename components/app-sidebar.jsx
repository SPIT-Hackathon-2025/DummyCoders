"use client";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ShieldCheck
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "SafePedal.ai",
  },
  teams: [
    {
      name: "SafePedal.ai",
      logo: ShieldCheck,
    }
  ],
  navMain: [
    {
      title: "Ride Safety & SOS",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Safe Routes",
          url: "/safeRoutes",
        },
        {
          title: "Emergency SOS",
          url: "/emergencySOS",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Smart Road Safety",
      url: "smartRoadSafety",
      icon: Frame,
    },
    {
      name: "Voice Safety Alerts",
      url: "/voiceSafetyAlerts",
      icon: PieChart,
    },
    {
      name: " Drowsiness Detection",
      url: "/drowsinessDetection",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}/>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}

