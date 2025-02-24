import { navMenu } from "@/data";
import Link from "next/link";
import NavLink from "./navLink";
import UpdateMain from "./UpdateMain";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbarLink">
        Developer Hanı
      </Link>
      <UpdateMain />

      <div className="absolute h-10 flex items-center -bottom-10 right-8 z-10 gap-1.5">
        {navMenu.map((item, i) => (
          <NavLink key={i} href={item.path} title={item.title} />
        ))}
      </div>
    </nav>
  );
}
