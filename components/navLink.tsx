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
      className={classNames(
        "bg-orange-300 bg-opacity-20 hover:bg-orange-400 hover:bg-opacity-30 border-b-2 border-solid border-transparent duration-200 px-5 rounded-b-lg h-full flex items-center backdrop-blur-lg",
        {
          "border-b-orange-500 !border-t-0 !pointer-events-none !text-orange-200":
            href === path,
        }
      )}
    >
      {title}
    </Link>
  );
}
