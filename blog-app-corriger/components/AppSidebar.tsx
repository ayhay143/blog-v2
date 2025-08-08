import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/editeur/home",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/editeur/Inbox",
    icon: Inbox,
  },
  {
    title: "Calendrier",
    url: "/editeur/Calendrier",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/editeur/Search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/editeur/Settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" className="top-31 h-[calc(100vh-130px)] fixed" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}