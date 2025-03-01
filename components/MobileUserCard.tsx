import { Friend } from "@/data";
import { allFirstLetterCapitalize } from "@/lib/app";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function MobileUserCard({ user }: { user: Friend }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/${user.username}`)}
      className="h-16 min-h-16 hover:border-orange-500 duration-200 px-2.5 hover:bg-black border-y-2 border-solid border-transparent"
    >
      <div className="flex items-center justify-between">
        <section className="text-sm flex gap-2 items-center">
          <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden border-2 border-solid border-gray-400 text-sm">
            {user?.profilePhoto ? (
              <Image
                width={220}
                height={220}
                className="object-top"
                src={`/images/${user.profilePhoto}` || ""}
                alt={user.name || ""}
              />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="flex flex-col items-start">
            <span>{allFirstLetterCapitalize(user.name)}</span>
            <span className="text-gray-400 text-[10px] font-medium">
              {user.username}
            </span>
          </div>
        </section>
        <section className="text-xs">
          {user.actionNumber === 1 ? (
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-gray-500 mr-1.5"></div>
          )}
        </section>
      </div>
    </button>
  );
}
