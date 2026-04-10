import {Barcode, Folder, Home, Settings, UsersRound} from "lucide-react";
import {Link} from "react-router";
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
  {title: "Dashboard", url: "/dashboard", icon: Home},
  {title: "Customers", url: "/customers", icon: UsersRound},
  {title: "Projects", url: "/projects", icon: Folder},
  {title: "Discount Codes", url: "/discount-codes", icon: Barcode},
  {title: "Settings", url: "/settings", icon: Settings},
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="px-2 py-1 text-sm font-semibold text-center">
          Gaber Dashboard
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="md">
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
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
        <div className="px-2 py-1 text-xs text-muted-foreground">
          Signed in as admin@example.com
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
