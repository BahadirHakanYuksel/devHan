import { createSlug } from "@/lib/app";
import { EventProps } from "@/lib/event";
import { motion } from "motion/react";
import Link from "next/link";

interface cardInterface {
  event: EventProps;
}

export const formatedToUIDate = (dateTime: Date) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} | ${hours}:${minutes}`;
};

export default function EventCard({ event }: cardInterface) {
  const eventStatistics = [
    {
      name: "Katılımcılar",
      icon: <i className="fa-solid fa-users text-gray-400"></i>,
      count: event.participants.length | 0,
    },
    {
      name: "Reactions",
      icon: <i className="fa-solid fa-heart text-gray-400"></i>,
      count: event.reactions.length | 0,
    },
  ];

  const attendAction = () => {
    // event.addParticipant("user_id");
    alert("Yakında...");
  };

  const slug = createSlug(`${event.id}`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#5555] rounded-lg p-3 flex flex-col gap-3 relative"
    >
      <div className="flex gap-2.5">
        <div className="aspect-square w-32 bg-[#111] rounded-lg flex items-center justify-center">
          {event.eventImg ? (
            <img
              src={event.eventImg}
              className="aspect-square w-full rounded-lg"
              alt=""
            />
          ) : (
            <i className="fa-regular fa-image text-4xl text-orange-200"></i>
          )}
        </div>
        <div className="w-[250px] flex flex-col">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <div className="flex">
            <p
              style={{
                color:
                  typeof event.category !== "string"
                    ? event.category.color
                    : "initial",
              }}
              onClick={() => (window.location.href = "https://www.google.com")} // Yönlendirme burada yapılır
              className="flex text-xs bg-black rounded-full px-2 h-5 items-center justify-center"
            >
              {typeof event.category !== "string" && (
                <>
                  <span>{event.category.emo}</span>
                  <span>{event.category.title}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-2.5">
            <p className="text-xs">
              Etkinlik{" "}
              <Link
                href={`/${event.creatorUsername}`}
                className="text-orange-200 hover:underline"
              >
                {event?.creatorName}
              </Link>{" "}
              tarafından oluşturuldu.
            </p>
            <div className="text-xs flex items-center">
              <span>Tarih:</span>
              <span className="text-orange-200">
                {formatedToUIDate(event.dateTime)}
              </span>
            </div>
            <div className="text-xs flex items-center">
              <span>Konum:</span>
              <Link
                href={event.googleMapsLink || "/events"}
                className="text-blue-300 hover:text-blue-200 hover:underline"
              >
                Tıkla da gör
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="h-8 w-32 rounded-lg  flex items-center justify-between">
          {eventStatistics.map((statistic, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3.5 bg-[#111] h-full rounded-lg"
            >
              {statistic.icon}
              <span className="text-sm">{statistic.count}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2.5">
          <Link
            className="bg-[#444] hover:bg-[#555] duration-200 rounded-sm w-20 flex items-center justify-center h-8"
            href={`/events/${slug}`}
          >
            İncele
          </Link>
          <button
            onClick={attendAction}
            className="bg-orange-500 bg-opacity-70 hover:bg-opacity-100 duration-200 rounded-sm w-32 flex items-center justify-center h-8"
          >
            Katıl
          </button>
        </div>
      </div>
    </motion.div>
  );
}
