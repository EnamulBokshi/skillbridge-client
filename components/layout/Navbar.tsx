"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

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
import { usePathname } from "next/navigation";
import { IUser } from "@/types/user.type";
import { UserAccountDropdown } from "../UserAccountDropdown";

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
  user?: Pick<IUser, "id" | "name" | "email" | "image" | "role"> | null;
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/skillBridge_logo.png",
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
  user = null,
}: Navbar1Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrolledWidth, setScrolledWidth] = useState("80%");

  useEffect(() => {
    const getResponsiveWidth = () => {
      if (window.innerWidth < 640) return "96%";
      if (window.innerWidth < 1024) return "90%";
      return "80%";
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const handleResize = () => {
      setScrolledWidth(getResponsiveWidth());
    };

    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pathName = usePathname();

  const renderTheCompleteRegistrationButton = isLoggedIn && !isAssociate;
  return (
    <motion.section
      className={cn("sticky top-0 z-50 py-4", className)}
      animate={{
        paddingTop: isScrolled ? 10 : 16,
        paddingBottom: isScrolled ? 10 : 16,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto"
        animate={{
          width: isScrolled ? scrolledWidth : "100%",
          borderRadius: isScrolled ? 16 : 0,
          backgroundColor: isScrolled
            ? "rgba(10, 18, 38, 0.55)"
            : "rgba(10, 18, 38, 0)",
          boxShadow: isScrolled
            ? "0 10px 30px rgba(0, 0, 0, 0.25)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        style={{ backdropFilter: isScrolled ? "blur(14px)" : "blur(0px)" }}
      >
        <div
          className={cn(
            "container mx-auto px-4 py-2 sm:py-3",
            isScrolled && "rounded-2xl border border-white/15"
          )}
        >
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
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          "group relative inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary focus-visible:bg-transparent focus-visible:text-primary data-active:bg-transparent data-active:text-primary after:pointer-events-none after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-[58%] sm:hover:after:w-[65%] lg:hover:after:w-[70%] focus-visible:after:w-[58%] sm:focus-visible:after:w-[65%] lg:focus-visible:after:w-[70%]",
                          isRouteActive(pathName, item.url) &&
                            "text-primary after:w-[58%] sm:after:w-[65%] lg:after:w-[70%]"
                        )}
                      >
                        <Link href={item.url}> {item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
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
            {isLoggedIn && user ? (
              <UserAccountDropdown user={user} showThemeToggle align="end" />
            ) : (
              <div className="flex gap-2">
                <ModeToggle />
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
                    {menu.map((item) => renderMobileMenuItem(item, pathName))}
                  </Accordion>

                  {/* // auth - login/signup */}
                  <div className="flex flex-col gap-3">
                    {isLoggedIn && user ? (
                      <UserAccountDropdown user={user} showThemeToggle align="center" />
                    ) : (
                      <>
                        <ModeToggle />
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
      </motion.div>
    </motion.section>
  );
};

// const renderMenuItem = (item: MenuItem) => {
//   return (

//   );
// };

const renderMobileMenuItem = (item: MenuItem, pathname: string) => {
  return (
    <Link
      key={item.title}
      href={item.url}
      className={cn(
        "text-md font-semibold transition-colors",
        isRouteActive(pathname, item.url)
          ? "text-primary underline underline-offset-6 decoration-2 decoration-primary"
          : "text-foreground"
      )}
      aria-current={isRouteActive(pathname, item.url) ? "page" : undefined}
    >
      {item.title}
    </Link>
  );
};

export { Navbar };
