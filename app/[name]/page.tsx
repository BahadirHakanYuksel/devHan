"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Department from "@/components/department";
import Team from "@/components/team";
import { calculateAge, Friend, friend } from "@/data";
import { allFirstLetterCapitalize, dateTimeConvertToDate } from "@/lib/app";
import Title from "@/components/title";
import EventCard from "@/components/eventCard";
import { EventBuilder, EventProps } from "@/lib/event";
import { motion } from "motion/react";
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
  const [events, setEvents] = useState<EventProps[] | null>(null);
  // const [isYou, setIsYou] = useState(false);

  // const { st_user } = useSelector((state: any) => state.AppStore);

  // const birthday = "03-18"; // Kişinin doğum günü
  // const today = new Date().toISOString().slice(5, 10);
  // const [showFireworks, setShowFireworks] = useState(false);

  // useEffect(() => {
  //   if (today === birthday) {
  //     startCelebration();
  //   }
  // }, []);

  // function createFirework() {
  //   const firework = document.createElement("div");
  //   firework.className = "firework";
  //   firework.style.left = Math.random() * 100 + "%";
  //   firework.style.top = Math.random() * 100 + "%";
  //   firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  //   const fireworksContainer = document.getElementById("fireworks");
  //   if (fireworksContainer) {
  //     fireworksContainer.appendChild(firework);
  //   }
  //   // Yeni ses öğesi oluştur ve çal
  //   const sound = new Audio("https://www.fesliyanstudios.com/play-mp3/2766");
  //   sound.play();

  //   setTimeout(() => firework.remove(), 1500);
  // }

  // function startCelebration() {
  //   setShowFireworks(true);
  //   const fireworkSound = document.getElementById(
  //     "fireworkSound"
  //   ) as HTMLAudioElement;
  //   if (fireworkSound) fireworkSound.play();
  //   let count = 0;
  //   const interval = setInterval(() => {
  //     createFirework();
  //     count++;
  //     if (count > 30) {
  //       clearInterval(interval);
  //       setTimeout(() => setShowFireworks(false), 15000);
  //     }
  //   }, 500);
  // }

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

  const fetchThisFriend = async (username: string) => {
    try {
      const responseToUser = await fetch(
        `/api/users?username=${encodeURIComponent(username)}`
      );
      const responseToUsers = await fetch(`/api/users`);

      if (!responseToUser.ok) throw new Error("Boyle biri yok");
      if (!responseToUsers.ok) throw new Error("Kimsecikler yok");

      const dataToUser = await responseToUser.json();
      const dataToUsers = await responseToUsers.json();

      if (dataToUser.success) {
        const this_user = dataToUser.users[0];

        const new_user: friend = new friend(
          this_user.id,
          this_user.name,
          this_user.surname,
          calculateAge(dateTimeConvertToDate(this_user.birthdayDate)),
          dateTimeConvertToDate(this_user.birthdayDate),
          this_user.profilePhoto,
          this_user.department,
          this_user.actionNumber,
          this_user.email,
          this_user.eventsAttended,
          this_user.gender,
          this_user.username
        );

        setUser(new_user);
        await fetchThisFriendEvents(this_user.id);

        const filtered_list = dataToUsers.users.filter(
          (user: Friend) => user.username !== this_user.username
        );

        setFilteredList(filtered_list);
      }
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  const fetchThisFriendEvents = async (id: string) => {
    try {
      const response = await fetch(`/api/events?creatorId=${id}`);
      if (!response.ok) throw new Error("Bu arkadaşın etkinliği yok");

      const data = await response.json();
      if (data.status === 200) {
        const dummy: EventProps[] = [];

        data.events.forEach((event: EventProps) => {
          const categoryName =
            typeof event.category === "string"
              ? event.category
              : event.category.title;

          dummy.push(
            new EventBuilder()
              .setId(event.id)
              .setName(event.name)
              .setDateTime(event.dateTime)
              .setGoogleMapsLink(event.googleMapsLink)
              .setCategory(categoryName)
              .setEventImg(event?.eventImg)
              .setParticipants(event.participants)
              .setReactions(event.reactions)
              .setCreatorName(event?.creatorName || "")
              .build()
          );
        });

        setEvents(dummy);
      }
    } catch (error) {
      console.error("Etkinlik arama hatası:", error);
    }
  };

  useEffect(() => {
    if (name) {
      fetchThisFriend(name);
    }
  }, [name]);

  // <div className="text-center bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center fixed z-50 left-0 top-0 w-full h-screen">
  //       <h1 className="text-3xl font-bold">Hoş Geldiniz!</h1>
  //       {showFireworks && (
  //         <div
  //           className="fixed top-0 left-0 w-full h-full pointer-events-none"
  //           id="fireworks"
  //         ></div>
  //       )}
  //       {today === birthday && (
  //         <button
  //           onClick={startCelebration}
  //           className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600"
  //         >
  //           Kutlamayı Tekrarla
  //         </button>
  //       )}
  //     </div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10 flex flex-col gap-5 items-center"
    >
      {/* {isYou && <h1 className="text-3xl font-bold text-white">Profil</h1>} */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 flex flex-col gap-5 items-center"
      >
        <div className="w-[220px] h-[220px] rounded-full flex items-center justify-center overflow-hidden border-2 border-solid border-gray-400 text-7xl">
          {user?.profilePhoto ? (
            <Image
              width={220}
              height={220}
              className="object-top rounded-full"
              src={`/images/${user.profilePhoto}` || ""}
              alt={user.name || ""}
            />
          ) : // <FaUser />
          user ? (
            <FaUser />
          ) : (
            <div className="loadingCircle">
              <FaUser />
            </div>
          )}
        </div>

        <div className="friend-name">
          {user ? (
            allFirstLetterCapitalize(
              user ? user.name + " " + user.surname : "no name"
            )
          ) : (
            <div className="container">
              <div className="loading-bar">Kim ulan bu?</div>
            </div>
          )}
        </div>
        <Department size="large">
          {user ? user?.department : "Handaş"}
        </Department>
        <div className="flex flex-col gap-2.5 h-[52px]">
          <section className="flex items-center justify-center gap-2.5">
            <p className="birthday-text">Yaş</p>
            <p className="birthday-text-value">{user?.age}</p>
          </section>
          <section className="flex items-center justify-center gap-2.5">
            <p className="birthday-text">Doğum Günü</p>
            <p className="birthday-text-value">
              {user?.birthdayDate.toString()}
            </p>
          </section>
        </div>
      </motion.div>

      {events && events.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-44"
        >
          <Title>Oluşturulan Etkinlikler</Title>
          <div className="profileEvents">
            {events.map((event: EventProps, index: number) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </motion.div>
      )}

      {filteredList && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-44"
        >
          {<Team db_data={filteredList} page="FRIEND_DETAIL" />}
        </motion.div>
      )}
    </motion.div>
  );
}
