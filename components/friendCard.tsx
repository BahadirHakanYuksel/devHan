import { convertURLForm } from "@/lib/friend";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import Department from "./department";
import { calculateAge, Friend, friend } from "@/data";
import { dateTimeConvertToDate } from "@/lib/app";

export default function FriendCard(data: Friend) {
  const user: friend = new friend(
    data.id,
    data.name,
    data.surname,
    calculateAge(dateTimeConvertToDate(data.birthdayDate.toString())),
    dateTimeConvertToDate(data.birthdayDate.toString()),
    data.profilePhoto,
    data.department
  );

  return (
    <Link
      href={`/${convertURLForm(user.name.toLowerCase().toString())}`}
      className="friendCard"
    >
      <div className="fcImageDiv">
        {user.profilePhoto !== "" ? (
          <Image
            src={user.profilePhoto}
            alt={`${user.name} ${user.surname} Profil 
            Resmi`}
            width={100}
            height={100}
            className="aspect-square object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center text-3xl w-full h-full">
            <FaRegUser />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="fcNameSurname">
          <span>{user?.name}</span>
          <span>{user?.surname}</span>
        </p>
        {user.department && (
          <Department size="small">{user.department}</Department>
        )}
      </div>
      <div className="fcBirthdayPart ">
        <p className="bg-gradient-to-tr to-orange-500 from-orange-800 px-2.5 text-xl italic font-medium rounded-md titleFont max-w-36 overflow-hidden">
          {user?.birthdayDate}
        </p>
        <p className="bg-white text-orange-500 px-2.5 text-xl italic font-extrabold rounded-md">
          {user?.age}
        </p>
      </div>
    </Link>
  );
}
