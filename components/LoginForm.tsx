"use client";

import { st_loginFront } from "@/utils/stores_actions/str_act";
import { useRouter } from "next/navigation";
// import { Router } from "next/router";
import React, { useState } from "react";

export default function LoginForm({
  setActiveState,
}: {
  setActiveState: (value: number) => void;
}) {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams] = useState({
    email: "",
    password: "",
  });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginParams),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Giriş başarısız");
      }

      if (data.success) {
        // JWT token veya session yönetimi
        localStorage.setItem("st_user", JSON.stringify(data.user));
        st_loginFront(data.user);
        alert("Giriş başarılı!");
        setLoginParams({ email: "", password: "" });
        router.push("/");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert(error instanceof Error ? error.message : "Beklenmeyen hata");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <form onSubmit={login} className="mx-auto w-[50%] p-5 flex flex-col gap-5">
      <header className="font-medium text-3xl rounded-lg text-orange-300 bg-orange-500 bg-opacity-15 px-2.5 h-16 flex items-center justify-start mb-2.5">
        Giriş Yap
      </header>
      <div className="relative flex flex-col gap-1">
        <p className="text-lg ml-3.5">
          E-mail{" "}
          <span className="text-gray-500 text-xs font-medium">
            example123@gmail.com
          </span>
        </p>
        <input
          value={loginParams.email}
          onChange={(e) =>
            setLoginParams({ ...loginParams, email: e.target.value })
          }
          type="email"
          className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
          placeholder="example123@gmail.com"
        />
      </div>

      <div className="relative flex flex-col gap-1">
        <p className="text-lg ml-3.5">
          Şifre{" "}
          <span className="text-gray-500 text-xs font-medium">
            Max 6, Min 30 karakter
          </span>
        </p>
        <input
          value={loginParams.password}
          onChange={(e) =>
            setLoginParams({ ...loginParams, password: e.target.value })
          }
          type="password"
          className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
          placeholder="Max 6, Min 30 karakter"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center h-14 rounded-lg bg-orange-500 text-white text-xl font-medium hover:bg-orange-600 duration-200"
      >
        Giriş Yap
      </button>
      <div className="flex items-center justify-end gap-1.5">
        <span className="text-gray-300">
          Henüz kayıt olmadın mı? Ayıp ediyorsun, hadi
        </span>
        <button
          type="button"
          onClick={() => setActiveState(1)}
          className="text-orange-400 font-medium hover:underline"
        >
          Kayıt Ol
        </button>
      </div>
    </form>
  );
}
