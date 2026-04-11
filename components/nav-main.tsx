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
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    return null;
  }

  return (
    <>
      {routes?.map((item) => (
        <SidebarGroup key={item.title} className="px-2 py-1.5">
          <SidebarGroupLabel className="h-6 px-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/90">
            {item.title}
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu className="gap-1.5">
              {item?.items?.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={subItem.title}
                    isActive={isRouteActive(pathName, subItem.url)}
                    className={
                      isRouteActive(pathName, subItem.url)
                        ? "rounded-xl border border-primary/20 bg-primary/12 text-primary shadow-sm hover:text-primary transition-colors duration-200"
                        : "rounded-xl text-sidebar-foreground/85 hover:bg-muted/55 hover:text-sidebar-foreground transition-colors duration-200"
                    }
                  >
                    <Link href={subItem.url} className="flex w-full items-center gap-2.5">
                      {subItem.icon && <subItem.icon className="size-4 shrink-0" />}
                      <span className="truncate text-[13px] font-medium">{subItem.title}</span>
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
      