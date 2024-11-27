import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";

interface FriendCardProps {
  id: string;
  name: string;
  surname: string;
  age: number | undefined;
  birthdayDate: string;
  profilePhoto: string;
  department?: string;
}

export default function FriendCard(friend: FriendCardProps) {
  return (
    <Link href={`/${friend.id}`} className="friendCard">
      <div className="fcImageDiv">
        {friend.profilePhoto !== "" ? (
          <Image
            src={friend.profilePhoto}
            alt={`${friend.name} ${friend.surname} Profil 
            Resmi`}
            width={100}
            height={100}
          />
        ) : (
          <div className="flex items-center justify-center text-3xl w-full h-full">
            <FaRegUser />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="fcNameSurname">
          <p>{friend.name}</p>
          <p>{friend.surname}</p>
        </div>
        {friend.department && (
          <p className="bg-orange-700 text-xs text-center rounded-full bg-opacity-50 text-white px-2.5">
            {friend.department}
          </p>
        )}
      </div>
      <div className="fcBirthdayPart ">
        <p className="bg-gradient-to-tr to-orange-500 from-orange-800 px-2.5 text-xl italic font-medium rounded-md">
          {friend.birthdayDate}
        </p>
        <p className="bg-white text-orange-500 px-2.5 text-xl italic font-extrabold rounded-md">
          {friend.age}
        </p>
      </div>
    </Link>
  );
}
