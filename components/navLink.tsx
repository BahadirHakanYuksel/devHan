"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  title: string;
}

export default function NavLink({ href, title }: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={classNames("navMenuItem", {
        navMenuItemActive: href === path,
      })}
    >
      {title}
    </Link>
  );
}
