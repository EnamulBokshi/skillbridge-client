"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggler";
import logoutUser from "@/helper/logout";
import { useConfirm } from "../modules/common/ConfirmDialog";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  isLoggedIn: boolean;
  isAssociate: boolean;
}

const Navbar = ({
  logo = {
    url: "http://localhost:3000",
    src: "https://defkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "SkillBridge",
  },
  menu = [
    { title: "Home", url: "/" },

    {
      title: "Explore Sessions",
      url: "/sessions",
    },
    {
      title: "Tutors",
      url: "/tutors",
    },
    {
      title: "About",
      url: "/about-us",
    },

  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
  isLoggedIn = false,
  isAssociate = false,
}: Navbar1Props) => {

  const { confirm } = useConfirm();
  const handleLogout = async () => {
    const ok = await confirm({
      title: "Logout?",
      description: "You will need to login again.",
      confirmText: "Logout",
      destructive: true,
    });
    if (!ok) return;
    await logoutUser();
  };
 
const pathName = usePathname();
  const isMatched = (url:string) =>{
    const urlLastSegment = url.split("/").filter(Boolean).pop()
    const pathLastSegment = pathName.split("/").filter(Boolean).pop()
    return urlLastSegment === pathLastSegment;
  }

  const renderTheCompleteRegistrationButton = isLoggedIn && !isAssociate;
  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {
                  menu.map((item) => 
                  
                  <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                      active={isMatched(item.url)}
                      >
                        <Link href={item.url} > {item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>)
                  }
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* // auth - login/signup/logout */}

          {/* complete registration button-desktop */}
          {renderTheCompleteRegistrationButton && (
            <Link href={"/complete-registration"}>
              <Button variant={"outline"} className="">
                {" "}
                Complete your registration{" "}
              </Button>
            </Link>
          )}

          <div className="flex gap-2">
            <ModeToggle />
            {isLoggedIn ? (
              <div className="flex  gap-3 items-center">
                <Button className="bg-violet-600">
                  <Link href={"/dashboard"}>{"Dashboard"}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  <Link href={"#"}>{"Logout"}</Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  {/* complete registration button-mobile */}
                  {renderTheCompleteRegistrationButton && (
                    <Link href={"/complete-registration"}>
                      <Button variant={"outline"}>
                        {" "}
                        Complete your registration{" "}
                      </Button>
                    </Link>
                  )}

                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* // auth - login/signup */}
                  <div className="flex flex-col gap-3">
                    <ModeToggle />
                    {isLoggedIn ? (
                      <div className="flex flex-col gap-3 items-center">
                        <Button className="bg-violet-600">
                          <Link href={"/dashboard"}>{"Dashboard"}</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          onClick={handleLogout}
                        >
                          <Link href={"#"}>{"Logout"}</Link>
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

// const renderMenuItem = (item: MenuItem) => {
//   return (
    
//   );
// };

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
