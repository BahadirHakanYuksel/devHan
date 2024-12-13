"use client";

import { filteredFriends, findFriend } from "@/lib/friend";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Department from "@/components/department";
import Team from "@/components/team";

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
  params: Promise<Params>;
}): JSX.Element {
  const [user, setUser] = useState<Friend | null>(null);
  const [filteredList, setFilteredList] = useState<Friend[] | null>(null);
  const [name, setName] = useState<string | null>(null);

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
      const friend = findFriend(name); // Find the friend based on the 'name'
      if (friend) {
        setUser(friend);
        setFilteredList(filteredFriends(friend.name)); // Filter the friends list
      } else {
        throw new Error("Friend not found");
      }
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
      <div className="friend-name">
        {user?.name} {user?.surname}
      </div>
      <Department size="large">{user?.department}</Department>
      <div className="flex flex-col gap-2.5 h-[52px]">
        <div className="flex items-center justify-center gap-2.5">
          <p className="birthday-text">Yaş</p>
          <p className="birthday-text-value">{user?.age}</p>
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <p className="birthday-text">Doğum Günü</p>
          <p className="birthday-text-value">{user?.birthdayDate}</p>
        </div>
      </div>

      {filteredList && (
        <div className="mt-44">
          {<Team data={filteredList} page="FRIEND_DETAIL" />}
        </div>
      )}
    </div>
  );
}
