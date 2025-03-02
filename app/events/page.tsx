"use client";

import DhButton from "@/components/dhButton";
import EventCard from "@/components/eventCard";
import EventOperationCard from "@/components/eventOperationCard";
import Title from "@/components/title";
import { StoreProps } from "@/lib/app";
import { EventBuilder, EventProps } from "@/lib/event";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EventPage() {
  const { st_user } = useSelector((state: StoreProps) => state.AppStore);

  const [eventOperationIsOpen, setEventOperationIsOpen] = useState(false);
  const eventOperationToggle = () => {
    if (st_user === null) {
      alert("Etkinlik oluşturabilmek için giriş yapmalısınız.");
      return;
    }
    setEventOperationIsOpen(!eventOperationIsOpen);
  };

  const [EVENTS, setMyEvents] = useState<EventProps[] | [] | null | undefined>(
    []
  );

  const [loading, setLoading] = useState(false);

  const takeAllEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");

      if (!response.ok) throw new Error("Events fetch failed");

      const data = await response.json();

      let dummy: EventProps[] = [];

      data.forEach((event: EventProps) => {
        const categoryName =
          typeof event.category === "string"
            ? event.category
            : event.category.title;

        dummy.push(
          new EventBuilder()
            .setId(event.id)
            .setName(event.name)
            .setDescription(event.description)
            .setDateTime(event.dateTime)
            .setGoogleMapsLink(event.googleMapsLink)
            .setCategory(categoryName)
            .setEventImg(event?.eventImg)
            .setParticipants(event.participants)
            .setReactions(event.reactions)
            .setCreatorName(event?.creatorName || "")
            .setCreatorId(event.creatorId || "")
            .setCreatedAt(event.createdAt || new Date())
            .setUpdatedAt(event.updatedAt || new Date())
            .build()
        );
      });

      setMyEvents(dummy);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    takeAllEvents();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 min-h-screen px-5 relative"
    >
      {eventOperationIsOpen && (
        <EventOperationCard setOperationIsOpen={setEventOperationIsOpen} />
      )}
      <div className="mx-auto w-[90%]">
        <Title type="event">
          <header>Etkinlikler</header>
          <DhButton click={eventOperationToggle}>
            <p>Yeni Etkinlik Oluştur</p>
            <div className="text-blue-800 bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <i className="fa-solid fa-plus"></i>
            </div>
          </DhButton>
        </Title>
        {loading ? (
          <div>Yükleniyor...</div>
        ) : (EVENTS ?? []).length > 0 ? (
          <div className="grid grid-cols-3 gap-10">
            {EVENTS &&
              EVENTS.length > 0 &&
              EVENTS.map((event, i) => <EventCard key={i} event={event} />)}
          </div>
        ) : (
          <div className="ml-3 text-gray-400">
            Etkinlik bulunamadı.{" "}
            <button
              onClick={eventOperationToggle}
              className="bg-orange-700 hover:bg-orange-600 rounded-full px-2.5 h-8 text-white"
            >
              Hemen bir tane oluştur
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
