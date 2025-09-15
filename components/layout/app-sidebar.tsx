import { NavGroup } from "@/components/layout/nav-group";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { UserRole } from "@/enums/user.enum";
import { useMyProfileQuery } from "@/hooks/api/use-my-profile-query";
import {
  IconLayoutDashboard,
  IconLockAccess,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: me } = useMyProfileQuery();
  const { data: session } = useSession();

  const menuItems = useMemo(() => {
    if (!session) return [];

    if (session.user.role === UserRole.USER) {
      return [
        {
          title: "Menu",
          items: [
            {
              title: "Dashboard",
              url: "/",
              icon: IconLayoutDashboard,
            },
          ],
        },
        {
          title: "Settings",
          items: [
            {
              title: "Settings",
              icon: IconLockAccess,
              items: [
                {
                  title: "Profile",
                  url: "/settings/profile",
                },
                {
                  title: "Password",
                  url: "/settings/password",
                },
                {
                  title: "Telegram",
                  url: "/settings/telegram",
                },
                {
                  title: "Zerodha",
                  url: "/settings/zerodha",
                },
              ],
            },
          ],
        },
        {
          title: "Documents",
          items: [
            {
              title: "Zerodha",
              url: "/document/zerodha",
              icon: IconLayoutDashboard,
            },
          ],
        },
      ];
    }

    if (session.user.role === UserRole.ADMIN) {
      return [
        {
          title: "Menu",
          items: [
            {
              title: "Dashboard",
              url: "/",
              icon: IconLayoutDashboard,
            },
            {
              title: "Users",
              url: "/admin/users",
              icon: IconUsersGroup,
            },
            {
              title: "Payments",
              url: "/admin/payments",
              icon: IconUsersGroup,
            },
          ],
        },
      ];
    }

    return [];
  }, [session]);

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarContent>
        {menuItems.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      {me ? (
        <SidebarFooter>
          <NavUser user={me} />
        </SidebarFooter>
      ) : null}

      <SidebarRail />
    </Sidebar>
  );
}
