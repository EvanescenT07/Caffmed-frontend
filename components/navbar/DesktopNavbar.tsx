"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNavbar = () => {
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
    <div className={cn("flex items-center space-x-8 ")}>
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={cn(
            "text-white font-medium transition-colors hover:text-light-tertiary hover:dark:text-dark-tertiary",
            route.active
              ? "text-light-text dark:text-dark-text"
              : "text-muted-foreground"
          )}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavbar;
