import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbarLink">
        <p className="">Developer Hanı</p>
        <p className="font-medium text-4xl text-orange-100">-</p>
        <p className=""> Birthadays</p>
      </Link>
    </nav>
  );
}
