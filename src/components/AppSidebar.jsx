import Logout from "@/features/auth/Logout";
import useUser from "@/features/auth/useUser";
import {Barcode, Folder, Settings} from "lucide-react";
import {FaThLarge, FaUserInjured, FaUserTie} from "react-icons/fa";
import {Link, useLocation} from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const navItems = [
  {title: "Dashboard", url: "/dashboard", icon: FaThLarge},
  {title: "Patients", url: "/patients", icon: FaUserInjured},
  {title: "Secretaries", url: "/secretaries", icon: FaUserTie},
  {title: "Projects", url: "/projects", icon: Folder},
  {title: "Discount Codes", url: "/discount-codes", icon: Barcode},
  {title: "Settings", url: "/settings", icon: Settings},
];

export function AppSidebar() {
  const {pathname} = useLocation();
  const {userMetadata, isLoading, firstName} = useUser();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="p-2 text-sm font-semibold text-center">
          Hi {isLoading ? "..." : firstName || userMetadata.email}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="p-2 space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton
                    asChild
                    size="md"
                    isActive={
                      pathname === item.url ||
                      pathname.startsWith(`${item.url}/`)
                    }>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-10 w-10" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t space-y-2 pt-4">
          <Logout />
          <div className="px-2 py-1 text-xs text-muted-foreground">
            Signed in as {userMetadata.email}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
