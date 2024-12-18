import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";

const Navbar = () => {
  return (
    <nav className="w-full px-4 xl:px-10 py-4 xl:py-6 bg-light-primary dark:bg-dark-primary">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            Caff<span className="">med</span>
          </h1>
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <DesktopNavbar />
          <ThemeSwitch />
        </div>
        <div className="xl:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
