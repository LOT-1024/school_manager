"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/homeComponent/nav-main"
import { NavUser } from "@/components/homeComponent/nav-user"
import { TeamSwitcher } from "@/components/homeComponent/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "example",
    email: "m@example.com",
    avatar: "/avatars/example.jpg",
  },
  navMain: [
    {
      title: "Manage",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Siswa",
          url: "/home/siswa",
        },
        {
          title: "Guru",
          url: "/home/guru",
        },
        {
          title: "Kelas",
          url: "#",
        },
        {
          title: "Mata Pelajaran",
          url: "#",
        },
      ],
    },
    {
      title: "Report / View",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Siswa berdasarkan Kelas",
          url: "#",
        },
        {
          title: "Guru berdasarkan Kelas",
          url: "#",
        },
        {
          title: "Teacher Overview",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
