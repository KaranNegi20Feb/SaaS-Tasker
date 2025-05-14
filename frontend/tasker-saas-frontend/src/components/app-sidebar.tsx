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
import { Link } from "react-router-dom"


const navConfig = {
  navMain: [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Tasks", url: "/tasks" },
    { title: "Team", url: "/team" },
    { title: "Chat", url: "/chat" }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navConfig.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="text-lg font-medium" asChild>
                  <Link to={item.url}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}