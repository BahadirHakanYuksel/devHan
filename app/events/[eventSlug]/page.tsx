"use client";

import { Event, EventBuilder } from "@/lib/event";
import { useEffect, useState } from "react";

interface Params {
  eventSlug: string; // eventName-eventId
}
export default function EventDetailPage({
  params,
}: {
  params: Promise<Params>;
}): JSX.Element {
  const [myEvent, setMyEvent] = useState<Event | null>(null);
  const event = new EventBuilder();
  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Resolve the promise
        const pathLenght = resolvedParams.eventSlug
          .toString()
          .split("-").length;
        const thisName = resolvedParams.eventSlug
          .toString()
          .split("-")
          .filter((_, index) => index < pathLenght - 1)
          .join(" ");
        event
          .setName(thisName)
          .setCategory("Yemek")
          .setDateTime(new Date())
          .setId()
          .build(); // Extract 'name' from resolved params

        setMyEvent(event.build());
      } catch (error) {
        console.error("Error resolving params:", error);
      }
      console.log(event, "event");
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    console.log(event, "yeni event sayfasi");
  }, [event]);

  return (
    <div className="px-10 py-20">
      {myEvent?.name}
      <br />
      {myEvent?.category.title}
      <br />
      {myEvent?.dateTime.toString()}
    </div>
  );
}
