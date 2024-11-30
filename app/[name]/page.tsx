"use client";

import { findFriend } from "@/lib/friend";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Department from "@/components/department";

interface Friend {
  id: string;
  name: string;
  surname: string;
  age: number;
  birthdayDate: string;
  profilePhoto: string;
  department: string;
}

interface Params {
  name: string;
}

export default function FriendDetailPage({
  params,
}: {
  params: Params;
}): JSX.Element {
  const { name } = params;
  console.log(name);

  const [user, setUser] = useState<Friend | null>(null);
  useEffect(() => {
    const friend = findFriend(name as string);
    if (friend) {
      setUser(friend);
    } else {
      throw new Error("Friend not found");
    }
  }, [name]);
  return (
    <div className="p-10 flex flex-col gap-5 items-center">
      <div className="w-[220px] h-[220px] rounded-full flex items-center justify-center overflow-hidden border-2 border-solid border-gray-400 text-7xl">
        {user?.profilePhoto ? (
          <Image
            width={220}
            height={220}
            className="object-top rounded-full"
            src={user.profilePhoto || ""}
            alt={user.name || ""}
          />
        ) : (
          <FaUser />
        )}
      </div>
      <div className="text-3xl font-medium text-white">
        {user?.name} {user?.surname}
      </div>
      <Department size="large">{user?.department}</Department>
      <div className="flex flex-col gap-2.5 h-[52px]">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-2xl font-medium text-orange-200 bg-orange-500 rounded-xl bg-opacity-20 px-10 py-2.5 w-56">
            Yaş
          </p>
          <p className="text-2xl font-medium text-white bg-white bg-opacity-10 h-full flex items-center justify-center rounded-xl w-40">
            {user?.age}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-2xl font-medium text-orange-200 rounded-xl bg-orange-500 bg-opacity-20 px-10 py-2.5 w-56">
            Doğum Günü
          </p>
          <p className="text-2xl font-medium text-white bg-white bg-opacity-10 h-full flex items-center justify-center rounded-xl w-40">
            {user?.birthdayDate}
          </p>
        </div>
      </div>
    </div>
  );
}
