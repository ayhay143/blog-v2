import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      
        <AppSidebar  />
        <SidebarTrigger className="mt-4" />
        {children}
      
    </SidebarProvider>
  )
}