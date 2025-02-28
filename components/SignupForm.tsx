"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

export default function SignupForm({
  setActiveState,
}: {
  setActiveState: (value: number) => void;
}) {
  const departmentList: string[] = [
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "Bilgisayar+Mekatronik Mühendisliği",
    "Tıbbi Labaratuvar Teknisyenliği",
    "Diğer",
  ];

  const genders: string[] = ["Erkek", "Kadın"];

  interface SignupParams {
    email: string;
    password: string;
    name: string;
    surname: string;
    birthdayDate: string | Date;
    department: string;
    profilePhoto: string;
    gender: string;
    username: string;
  }

  const [signupParams, setSignupParams] = useState<SignupParams>({
    email: "",
    password: "",
    name: "",
    surname: "",
    birthdayDate: "",
    department: "Bilgisayar Mühendisliği",
    profilePhoto: "",
    gender: "",
    username: "",
  });

  const [passwordAgain, setPasswordAgain] = useState<string>("");

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signupParams.department);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupParams.email.trim(),
          password: signupParams.password.trim(),
          name: signupParams.name.trim(),
          surname: signupParams.surname.trim(),
          birthdayDate: new Date(signupParams.birthdayDate),
          department: signupParams.department.toString(),
          profilePhoto: signupParams.profilePhoto.trim(),
          gender: signupParams.gender.trim(),
          username: signupParams.username.trim(),
        }),
      });

      // HTTP hata kontrolü
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Kayıt sırasında hata oluştu");
      }

      const data = await response.json();

      if (data.status === 201) {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        // Yönlendirme veya form temizleme
        setSignupParams({
          email: "",
          password: "",
          name: "",
          surname: "",
          username: "",
          birthdayDate: "",
          department: "Bilgisayar Mühendisliği",
          profilePhoto: "",
          gender: "",
        });
        setActiveState(0);
      } else {
        alert(data.message || "Kayıt işlemi başarısız oldu");
      }
    } catch (error) {
      console.log("Kayıt hatası:", error);
      alert(
        error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu"
      );
    }
  };

  useEffect(() => {
    console.log(signupParams.department);
    console.log(typeof signupParams.department);
  }, [signupParams.department]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name == "birthdayDate")
      setSignupParams({ ...signupParams, [name]: value });
    else setSignupParams({ ...signupParams, [name]: value });
  };

  return (
    <form onSubmit={signup} className="mx-auto w-[50%] p-5 flex flex-col gap-5">
      <header className="font-medium text-3xl rounded-lg text-orange-300 bg-orange-500 bg-opacity-15 px-2.5 h-16 flex items-center justify-end mb-2.5">
        Kayıt Ol
      </header>
      <div className="grid grid-cols-3 gap-5">
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Adınız{" "}
            <span className="text-gray-500 text-xs font-medium">
              Min 3 karakter
            </span>
          </p>
          <input
            value={signupParams.name}
            name="name"
            onChange={handleChange}
            type="text"
            className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
            placeholder="Bahadır Hakan"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Soyadınız{" "}
            <span className="text-gray-500 text-xs font-medium">
              Min 2 karakter
            </span>
          </p>
          <input
            value={signupParams.surname}
            name="surname"
            onChange={handleChange}
            type="text"
            className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
            placeholder="Yüksel"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Kullanıcı Adınız{" "}
            <span className="text-gray-500 text-xs font-medium">
              Min 3 karakter
            </span>
          </p>
          <input
            value={signupParams.username}
            name="username"
            onChange={handleChange}
            type="text"
            className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
            placeholder="Hahpu"
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-1">
        <p className="text-lg ">
          E-mail Adresiniz
          <span className="text-gray-500 text-xs font-medium"></span>
        </p>
        <input
          value={signupParams.email}
          name="email"
          onChange={handleChange}
          type="email"
          className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
          placeholder="example123@gmail.com"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Şifre{" "}
            <span className="text-gray-500 text-xs font-medium">
              Min 6, Max 30 karakter
            </span>
          </p>
          <input
            name="password"
            value={signupParams.password}
            onChange={handleChange}
            type="password"
            className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
            placeholder="Şifreeee"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Şifre Tekrar{" "}
            <span className="text-gray-500 text-xs font-medium">
              Robot değilsen doğru girersin
            </span>
          </p>
          <input
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            type="password"
            className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
            placeholder="Tekrar Şifreeee"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Doğum Tarihiniz{" "}
            <span className="text-gray-500 text-xs font-medium">
              gün.ay.yıl
            </span>
          </p>
          <input
            value={
              signupParams.birthdayDate instanceof Date
                ? signupParams.birthdayDate.toISOString().split("T")[0]
                : signupParams.birthdayDate
            }
            name="birthdayDate"
            onChange={handleChange}
            type="date"
            className="rounded-lg px-2.5 h-14 bg-transparent border-2 border-solid border-gray-600 focus:border-gray-400"
            placeholder="00.00.0000"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Cinsiyetiniz{" "}
            <span className="text-gray-500 text-xs font-medium">
              Başka ihtimal yok
            </span>
          </p>
          <div className="grid grid-cols-2 gap-1.5 h-14">
            {genders.map((gender, i) => (
              <button
                type="button"
                name={gender}
                onClick={() => setSignupParams({ ...signupParams, gender })}
                key={i}
                className={classNames(
                  "h-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-orange-300 duration-200 rounded-lg",
                  {
                    "!border-orange-500 !text-orange-200":
                      gender === signupParams.gender,
                  }
                )}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-lg ">
            Bölümünüz{" "}
            <span className="text-gray-500 text-xs font-medium">
              Çen büyüdün mü çen?
            </span>
          </p>
          <select
            onChange={(e) =>
              setSignupParams({ ...signupParams, department: e.target.value })
            }
            className="rounded-lg px-2.5 h-14 bg-black border-2 border-solid border-gray-600 focus:border-gray-400"
            name=""
            id=""
            value={signupParams.department}
          >
            {departmentList.map((department, i) => (
              <option
                className={classNames({
                  "!bg-orange-500": department === signupParams.department,
                })}
                key={i}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center h-14 rounded-lg bg-orange-500 text-white text-xl font-medium hover:bg-orange-600 duration-200"
      >
        Kayıt Ol
      </button>
      <div className="flex items-center justify-end gap-1.5">
        <span className="text-gray-300">
          Zaten Kayıt oldun mu, hadi canım, senin hesabın da vardır şimdi, hadi
          o zaman
        </span>
        <button
          type="button"
          onClick={() => setActiveState(0)}
          className="text-orange-400 font-medium hover:underline"
        >
          Giriş Yap
        </button>
      </div>
    </form>
  );
}
