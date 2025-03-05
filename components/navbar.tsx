"use client";

import { navMenu } from "@/data";
import Link from "next/link";
import NavLink from "./navLink";
import UpdateMain from "./UpdateMain";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { st_logoutFront } from "@/utils/stores_actions/str_act";
import { useRouter } from "next/navigation";
import { StoreProps } from "@/lib/app";

export default function Navbar() {
  const { st_user } = useSelector((state: StoreProps) => state.AppStore);

  const [st_user_hook] = useState(st_user);

  interface MenuItem {
    title: string;
    path: string;
  }

  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>({
    title: "Giriş Yap - Kayıt Ol",
    path: "/register",
  });
  const router = useRouter();

  const logout = async () => {
    try {
      // Logout API'sini çağır
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: st_user?.id }),
      });

      if (response.ok) {
        alert("Çıkış başarılı!");
        st_logoutFront();
        router.push("/");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error("Çıkış sırasında hata");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Beklenmeyen hata");
    }
  };

  useEffect(() => {
    if (st_user !== null) {
      setActiveMenuItem({
        title: "Profil",
        path: `/${st_user?.username?.toString() || ""}`,
      });
    } else {
      setActiveMenuItem({ title: "Giriş Yap - Kayıt Ol", path: "/register" });
    }
    return () => {};
  }, [st_user_hook]);

  return (
    <nav className="navbar">
      <Link href="/" className="navbarLink">
        Developer Hanı
      </Link>
      <UpdateMain />

      <div className="navMenu">
        {navMenu.map((item, i) => (
          <NavLink key={i} href={item.path} title={item.title} />
        ))}
        <NavLink href={activeMenuItem.path} title={activeMenuItem.title} />
        {activeMenuItem?.path !== "/register" && (
          <button onClick={logout} className={classNames("NavLogOutButton")}>
            Çıkış Yap
          </button>
        )}
      </div>
    </nav>
  );
}
