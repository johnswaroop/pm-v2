import {
  LayoutDashboard,
  ListTodo,
  Users,
  Calendar,
  BarChart,
  Settings,
} from "lucide-react";

export interface Route {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface RouteGroup {
  label: string;
  routes: Route[];
}

export const routes: RouteGroup[] = [
  {
    label: "Core",
    routes: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Overview of your projects and tasks",
      },
      {
        label: "Tasks",
        href: "/tasks",
        icon: ListTodo,
        description: "Manage and organize tasks",
      },
    ],
  },
  {
    label: "Management",
    routes: [
      {
        label: "Team",
        href: "/team",
        icon: Users,
        description: "Manage team members and roles",
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: Calendar,
        description: "View schedules and deadlines",
      },
    ],
  },
  {
    label: "Analysis",
    routes: [
      {
        label: "Reports",
        href: "/reports",
        icon: BarChart,
        description: "View analytics and reports",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Configure system settings",
      },
    ],
  },
];

export function isRouteActive(pathname: string, route: Route): boolean {
  if (route.href === "/") {
    return pathname === route.href;
  }
  return pathname.startsWith(route.href);
}

export function getAllRoutes(): Route[] {
  return routes.flatMap((group) => group.routes);
}

export function getActiveRoute(pathname: string): Route | undefined {
  return getAllRoutes().find((route) => isRouteActive(pathname, route));
}

export function getActiveGroup(pathname: string): RouteGroup | undefined {
  return routes.find((group) =>
    group.routes.some((route) => isRouteActive(pathname, route))
  );
}
