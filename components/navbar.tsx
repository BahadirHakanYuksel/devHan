import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbarLink">
        Developer Hanı
      </Link>
    </nav>
  );
}
