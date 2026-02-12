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

export function NavMain({ routes }: { routes: SidebarRoute[] }) {
  const pathName = usePathname();
  const isMatched = (url:string) =>{
    const urlLastSegment = url.split("/").filter(Boolean).pop()
    const pathLastSegment = pathName.split("/").filter(Boolean).pop()
    return urlLastSegment === pathLastSegment;
  }
  const activeItem = pathName.split("/").pop();
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
                    isActive={isMatched(subItem.url)}
                    className={isMatched(subItem.url)? 'text-violet-400' :''}
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
      