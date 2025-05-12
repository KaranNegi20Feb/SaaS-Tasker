import { AppSidebar } from "../components/app-sidebar"
import { TopNavbar } from "../components/top-navbar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar"
import { useLocation } from "react-router-dom"
import DashboardHome from "./dashboard-section/DashboardHome"
import Tasks from "./dashboard-section/Tasks"
import Teams from "./dashboard-section/Teams"
import Chat from "./dashboard-section/Chat"
import Profile from "./Profile"

export default function Dashboard() {
  const location = useLocation()

  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard":
        return <DashboardHome />
      case "/tasks":
        return <Tasks />
      case "/team":
        return <Teams />
      case "/chat":
        return <Chat />
      case "/profile":
        return <Profile/>
      default:
        return <div>Page Not Found</div>
    }
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">          
          <SidebarTrigger className="border" />
          <TopNavbar />
        </header>
        <main className="p-4">
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}