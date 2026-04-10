"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarRoute } from "@/types";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const normalizePath = (value: string) => {
  if (!value) return "/";
  const normalized = value.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
};

const isRouteActive = (pathname: string, url: string) => {
  const current = normalizePath(pathname);
  const target = normalizePath(url);

  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
};

export function NavMain({ routes }: { routes: SidebarRoute[] }) {
  const pathName = usePathname();

  if (!routes || routes.length === 0) {
    toast.error("No routes available");
    redirect("/");
  }
  return (
    <>
      {routes?.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel># {item.title}</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {item?.items?.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton
                    tooltip={subItem.title}
                    // className={
                    //   // subItem.title === activeItem
                    //   //   ? "bg-accent/50 text-accent-foreground"
                    //   //   : ""

                    // }
                    isActive={isRouteActive(pathName, subItem.url)}
                    className={
                      isRouteActive(pathName, subItem.url) ? "text-primary" : ""
                    }
                  >
                    <Link href={subItem.url} >
                    {subItem.icon && <subItem.icon className = "inline mr-2"/>}
                    <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
      