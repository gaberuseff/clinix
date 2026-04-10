import {Outlet} from "react-router";
import AppHeader from "./AppHeader";
import {AppSidebar} from "./AppSidebar";
import {SidebarInset, SidebarProvider} from "./ui/sidebar";

function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppLayout;
