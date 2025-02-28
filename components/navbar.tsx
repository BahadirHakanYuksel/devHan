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
import { convertURLForm } from "@/lib/friend";

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
      } else {
        throw new Error("Çıkış sırasında hata");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Beklenmeyen hata");
    }
  };

  useEffect(() => {
    console.log("st_user_hook", st_user_hook);

    if (st_user !== null) {
      setActiveMenuItem({
        title: "Profil",
        path: `/${convertURLForm(st_user.name.toString())}`,
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

      <div className="absolute h-10 flex items-center -bottom-10 right-8 z-10 gap-1.5">
        {navMenu.map((item, i) => (
          <NavLink key={i} href={item.path} title={item.title} />
        ))}
        <NavLink href={activeMenuItem.path} title={activeMenuItem.title} />
        {activeMenuItem?.path !== "/register" && (
          <button
            onClick={logout}
            className={classNames(
              "bg-orange-300 bg-opacity-20 hover:bg-orange-400 hover:bg-opacity-30 border-b-2 border-solid border-transparent duration-200 px-5 rounded-b-lg h-full flex items-center backdrop-blur-lg"
            )}
          >
            Çıkış Yap
          </button>
        )}
      </div>
    </nav>
  );
}
