"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeSwitch from "../ThemeSwitch";

const MobileNavbar = () => {
  const path = usePathname();

  const routes = [
    {
      name: "Home",
      path: "/",
      active: path === "/",
    },
    {
      name: "Knowledge",
      path: "/knowledge",
      active: path === "/knowledge",
    },
    {
      name: "About",
      path: "/about",
      actie: path === "/about",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <RxHamburgerMenu className="text-[24px]" />
      </SheetTrigger>
      <SheetContent>
        <h1 className=" text-secondary mt-24 mb-24 text-center text-2xl font-bold">
          Caff<span className="">med</span>
        </h1>
        <nav className="text-xl flex flex-col items-center justify-center space-y-12">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-secondary font-medium transition-colors hover:text-blue-hover",
                route.active ? "text-blue-default" : "text-muted-foreground"
              )}
            >
              {route.name}
            </Link>
          ))}
          <ThemeSwitch />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
