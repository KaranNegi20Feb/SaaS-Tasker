import { AppSidebar } from "../components/app-sidebar"
import { TopNavbar } from "../components/top-navbar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar"
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">          
        <SidebarTrigger className="border" />
          <TopNavbar/>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
