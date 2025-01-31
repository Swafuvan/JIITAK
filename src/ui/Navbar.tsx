"use client";

import { Logo, SmallLogo } from "@/helper/iconFIle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative ml-3 w-20 h-7 block md:hidden">
                <SmallLogo />
              </div>
              <div className="relative w-20 h-7 hidden md:block">
                <Logo />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
