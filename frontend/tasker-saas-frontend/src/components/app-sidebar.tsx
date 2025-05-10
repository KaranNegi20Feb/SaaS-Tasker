import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "../components/ui/sidebar"

import { TeamSwitcher } from "./team-switcher"


const navConfig = {
  navMain: [
    {
      title: "Dashboard",
      url: "#"
    },
    {
      title: "Tasks",
      url: "#"
    },
    {
      title: "Team",
      url: "#"
    },
    {
      title: "Chat",
      url: "#"
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navConfig.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="text-lg font-medium" asChild>
                  <a href={item.url}>
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
