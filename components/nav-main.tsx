"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarRoute } from "@/types";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export function NavMain({ routes }: { routes: SidebarRoute[] }) {
  const router = useRouter();
  const param = useParams();
  console.log("Params in NavMain:", param);
  if (!routes || routes.length === 0) {
    router.push("/");
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
                    className={
                      subItem.isActive
                        ? "bg-accent/50 text-accent-foreground"
                        : ""
                    }
                  >
                    <Link href={subItem.url}>
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
      