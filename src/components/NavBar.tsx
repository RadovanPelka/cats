"use client";
import clsx from "clsx";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

const ACTIVE_STYLES = "text-blue-500 py-1 border-b-2 border-blue-500";

const ROUTES = [
  {href: "/", label: "Home"},
  {href: "/breeds", label: "Breeds"},
  {href: "/favorites", label: "Favorites"},
];

const NavBar = () => {
  const currentRoute = usePathname();

  return (
    <nav className="mb-10">
      <ul className="flex items-center justify-center space-x-6">
        {ROUTES.map((route) => (
          <li key={route.href}>
            <Link href={route.href} className={clsx(currentRoute === route.href && ACTIVE_STYLES)}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
