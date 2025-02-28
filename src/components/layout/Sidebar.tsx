"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes, isRouteActive } from "@/lib/navigation";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn("flex items-center gap-3", isCollapsed && "hidden")}>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500" />
          <span className="font-semibold text-sidebar-foreground">
            PM System
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Search and Notifications */}
      <div
        className={cn(
          "flex items-center gap-2 border-b border-sidebar-border p-4",
          isCollapsed && "justify-center"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Search className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>No new notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 p-4">
        {routes.map((group) => (
          <div key={group.label} className="space-y-2">
            {!isCollapsed && (
              <h4 className="px-2 text-xs font-medium uppercase text-sidebar-foreground/60">
                {group.label}
              </h4>
            )}
            <div className="space-y-1">
              {group.routes.map((route) => {
                const isActive = isRouteActive(pathname, route);
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? route.label : undefined}
                  >
                    <route.icon className={cn("h-5 w-5 flex-shrink-0")} />
                    {!isCollapsed && <span>{route.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div
        className={cn(
          "flex items-center gap-3 border-t border-sidebar-border p-4",
          isCollapsed && "justify-center"
        )}
      >
        <div className="h-8 w-8 rounded-full bg-sidebar-accent" />
        {!isCollapsed && (
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">
              John Doe
            </p>
            <p className="text-xs text-sidebar-foreground/60">Admin</p>
          </div>
        )}
      </div>
    </div>
  );
}
