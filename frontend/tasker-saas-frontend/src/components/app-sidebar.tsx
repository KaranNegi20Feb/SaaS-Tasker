import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton
} from "../components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { Link } from "react-router-dom"
import { Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
const navConfig = {
  navMain: [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Tasks", url: "/tasks" },
    { title: "Team", url: "/team" },
    { title: "Profile", url: "/profile" }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate=useNavigate();
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
      <SidebarFooter>
  <SidebarMenuSubButton
    onClick={() => {
      navigate('/setting')
    }}
    className="flex items-center gap-3 p-4 border border-gray-700 bg-black rounded-md hover:bg-gray-900 transition-colors cursor-pointer"
  >
    <Settings className="w-5 h-5 stroke-white" />
    <span className="font-semibold text-md text-white">Settings</span>
  </SidebarMenuSubButton>
</SidebarFooter>


    </Sidebar>
  )
}
