"use client";

import DhButton from "@/components/dhButton";
import { formatedToUIDate } from "@/components/eventCard";
import { getUserInfoAboutEvent } from "@/lib/app";
import { Event, EventBuilder } from "@/lib/event";
import { motion } from "motion/react";
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
  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Resolve the promise
        const response = await fetch(
          `/api/events?id=${encodeURIComponent(resolvedParams.eventSlug)}`
        );
        const data = await response.json();

        if (response.ok && data?.creatorId) {
          getUserInfoAboutEvent(data.creatorId).then((res) => {
            const dummy_data = new EventBuilder()
              .setId(data.id)
              .setName(data.name)
              .setDescription(data.description)
              .setDateTime(data.dateTime)
              .setGoogleMapsLink(data.googleMapsLink)
              .setCategory(data.category)
              .setEventImg(data.eventImg)
              .setParticipants(data.participants)
              .setReactions(data.reactions)
              .setCreatorName(res?.name)
              .setCreatorUsername(res?.username)
              .setCreatorId(data.creatorId || "")
              .setCreatedAt(data.createdAt || new Date())
              .setUpdatedAt(data.uploadedAt || new Date())
              .build();
            setMyEvent(dummy_data);
          });
        }
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };
    fetchParams();
  }, [params]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-10 py-20 flex "
    >
      {myEvent && (
        <div className="w-[60%] mx-auto flex flex-col gap-5">
          <div className="flex items-end justify-between mt-5">
            <section className="text-4xl flex items-end gap-2.5">
              <header className=" font-medium text-orange-200">Etkinlik</header>
              <p className="font-medium">{myEvent.name}</p>
              <div className="flex flex-col">
                {formatedToUIDate(new Date(myEvent.createdAt || "")) ===
                formatedToUIDate(new Date(myEvent.updatedAt || "")) ? (
                  <span className="text-xs font-medium text-gray-400">
                    {formatedToUIDate(new Date(myEvent.createdAt || ""))}
                    {"'"}de oluşturuldu.
                  </span>
                ) : (
                  <>
                    <span className="text-xs font-medium text-gray-400">
                      {formatedToUIDate(new Date(myEvent.createdAt || ""))}
                      {"'"}de oluşturuldu.
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {formatedToUIDate(new Date(myEvent.updatedAt || ""))}
                      {"'"}de güncellendi.
                    </span>
                  </>
                )}
              </div>
            </section>
            <DhButton type="button" click={() => alert("Yakında...")}>
              Katıl
            </DhButton>
          </div>
          <section className="text-lg">
            <header className="text-orange-200 font-medium">Açıklama</header>
            <p>{myEvent.description}</p>
          </section>

          <div className="grid grid-cols-3 gap-2.5 bg-gray-700 bg-opacity-20 overflow-hidden rounded-lg">
            <Box
              title="Tarih-Saat"
              value={formatedToUIDate(new Date(myEvent.dateTime))}
            />
            <Box
              title="Kategori"
              value={`${
                typeof myEvent.category === "string"
                  ? myEvent.category
                  : myEvent.category.emo || ""
              }${
                typeof myEvent.category === "string"
                  ? myEvent.category
                  : myEvent.category.title || ""
              }`}
            />
            <Box
              title="Oluşturan"
              value={
                myEvent?.creatorName?.toString() +
                  " / " +
                  myEvent.creatorUsername || "Unknown"
              }
            />
            <Box
              title="Katılımcılar"
              value={myEvent.participants.length + ""}
            />
            <Box
              title="Reaksiyonlar"
              value={myEvent.reactions.length.toString()}
            />
            <Box
              title="Google Maps Link"
              value={
                myEvent.googleMapsLink || "-"
                // "Camiye sırtını verdin, anadınıı, birinci değil ikinci ışıktan sola anadınıı, sonra sapma hiç bir yere, anadınıı"
              }
            />
          </div>
        </div>
      )}
      {!myEvent && <div>Yükleniyor...</div>}
    </motion.div>
  );
}

const Box = ({ title, value }: { title: string; value: string }) => {
  return (
    <section className="box p-6 hover:bg-black h-36 max-h-36 overflow-y-auto flex flex-col justify-center items-center duration-150">
      <header className="text-lg font-medium text-orange-200">{title}</header>
      <p className="text-base">{value}</p>
    </section>
  );
};
