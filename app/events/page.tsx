"use client";

import DhButton from "@/components/dhButton";
import EventCard from "@/components/eventCard";
import EventOperationCard from "@/components/eventOperationCard";
import Title from "@/components/title";
import DATA from "@/data";
import { Event, EventBuilder } from "@/lib/event";
import { useEffect, useState } from "react";

export default function EventPage() {
  const [eventOperationIsOpen, setEventOperationIsOpen] = useState(false);
  const eventOperationToggle = () => {
    setEventOperationIsOpen(!eventOperationIsOpen);
  };

  const [EVENT, setEVENT] = useState<Event | null>(null);
  const [EVENTS, setMyEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (EVENT === null) {
      const newEvent = new EventBuilder()
        .setName("Yeni Etkinlik")
        .setCategory("Yemek")
        .setDescription("deneme açıklama")
        .setDateTime(new Date())
        .setGoogleMapsLink("https://maps.app.goo.gl/nrWFrvmVSnhAQbNZ6")
        .setId()
        .setCreator(DATA[0].name)
        .build();
      setEVENT(newEvent);
    }
  }, []);

  return (
    <div className="py-20 min-h-screen px-5 relative">
      {eventOperationIsOpen && (
        <EventOperationCard
          setMyEvents={setMyEvents}
          setOperationIsOpen={setEventOperationIsOpen}
        />
      )}
      <Title type="event">
        <header>Etkinlikler</header>
        <DhButton click={eventOperationToggle}>
          <p>Yeni Etkinlik Oluştur</p>
          <div className="text-blue-800 bg-white rounded-full w-8 h-8 flex items-center justify-center">
            <i className="fa-solid fa-plus"></i>
          </div>
        </DhButton>
      </Title>
      <div className="flex flex-wrap gap-10">
        {EVENT && <EventCard event={EVENT} />}
        {EVENTS.length > 0 &&
          EVENTS.map((event, i) => <EventCard key={i} event={event} />)}
      </div>
      <button className="mt-5 px-2.5 rounded-full bg-gray-500 bg-opacity-20">
        Buna basınca modal açılacak
      </button>
    </div>
  );
}
