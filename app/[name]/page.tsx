"use client";

import { filteredFriends, findFriend } from "@/lib/friend";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Department from "@/components/department";
import Team from "@/components/team";
import { calculateAge, friend } from "@/data";
import { dateTimeConvertToDate } from "@/lib/app";
// import { useSelector } from "react-redux";

interface Params {
  name: string;
}

export default function FriendDetailPage({
  params,
}: {
  params: Promise<Params>;
}): JSX.Element {
  const [user, setUser] = useState<friend | null>(null);
  const [filteredList, setFilteredList] = useState<friend[] | null>(null);
  const [name, setName] = useState<string | null>(null);
  // const [isYou, setIsYou] = useState(false);

  // const { st_user } = useSelector((state: any) => state.AppStore);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Resolve the promise
        setName(resolvedParams.name); // Extract 'name' from resolved params
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (name) {
      const data = findFriend(name); // Find the friend based on the 'name'
      console.log(name);

      if (data) {
        const new_user: friend = new friend(
          data.id,
          data.name,
          data.surname,
          calculateAge(dateTimeConvertToDate(data.birthdayDate)),
          dateTimeConvertToDate(data.birthdayDate),
          data.profilePhoto,
          data.department
        );
        setUser(new_user);
        // st_user?.name === friend?.name ? setIsYou(true) : setIsYou(false);

        setFilteredList(filteredFriends(data.name)); // Filter the friends list
      } else {
        throw new Error("Friend not found");
      }
    }
  }, [name]);

  return (
    <div className="p-10 flex flex-col gap-5 items-center">
      {/* {isYou && <h1 className="text-3xl font-bold text-white">Profil</h1>} */}

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
      <div className="friend-name">
        {user?.name} {user?.surname}
      </div>
      <Department size="large">{user ? user?.department : "Handaş"}</Department>
      <div className="flex flex-col gap-2.5 h-[52px]">
        <section className="flex items-center justify-center gap-2.5">
          <p className="birthday-text">Yaş</p>
          <p className="birthday-text-value">{user?.age}</p>
        </section>
        <section className="flex items-center justify-center gap-2.5">
          <p className="birthday-text">Doğum Günü</p>
          <p className="birthday-text-value">{user?.birthdayDate.toString()}</p>
        </section>
      </div>

      {filteredList && (
        <div className="mt-44">
          {<Team data={filteredList} page="FRIEND_DETAIL" db_data={null} />}
        </div>
      )}
    </div>
  );
}
