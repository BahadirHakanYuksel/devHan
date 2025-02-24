import {
  closeTheEventOperationCard,
  EventBuilder,
  eventCategories,
} from "@/lib/event";
import "../app/css_files/eventOperationCard.css";
import DhButton from "./dhButton";
import { useState } from "react";
import DATA from "@/data";

interface eventFormInterface {
  name: string;
  description: string;
  date: Date;
  googleMapsLink: string;
  category: string;
  imageUrl: File;
  imageUrlToUI: string;
  creatorName: string;
}

export default function EventOperationCard({
  setOperationIsOpen,
  setEvents,
}: {
  setOperationIsOpen: (value: boolean) => void;
  setEvents: (events: any) => void;
}) {
  const [eventForm, setEventForm] = useState<eventFormInterface>({
    name: "",
    description: "",
    date: new Date(),
    googleMapsLink: "",
    category: "Yemek",
    imageUrl: new File([""], ""),
    imageUrlToUI: "",
    creatorName: "belirsiz biri",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "creatorName") {
      console.log(e.target.value);
    }
    if (e.target.name === "imageUrl") {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const file = (e.target as HTMLInputElement).files![0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventForm({
          ...eventForm,
          imageUrl: file,
          imageUrlToUI: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setEventForm({
        ...eventForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createEvent = () => {
    console.log(eventForm);
    console.log(eventForm.creatorName);

    const event = new EventBuilder()
      .setId()
      .setName(eventForm.name)
      .setDescription(eventForm.description)
      .setDateTime(eventForm.date)
      .setGoogleMapsLink(eventForm.googleMapsLink)
      .setCategory(eventForm.category)
      .setEventImg(eventForm.imageUrlToUI)
      .setCreator(eventForm.creatorName)
      .build();

    setEvents((prevEvents: any) => [...prevEvents, event]);
  };

  return (
    <div className="eventOperationCard">
      <header className="text-2xl text-blue-300">Etkinlik Oluştur</header>
      <div className="eop_main">
        <div className="flex flex-col gap-2.5 h-full">
          {eventForm.imageUrl.name ? (
            <>
              <img
                src={eventForm.imageUrlToUI}
                className="aspect-square w-full rounded-lg"
                alt=""
              />
              <label
                htmlFor="takeImgToEOP2"
                className="flex items-center flex-col gap-2.5 justify-center bg-white bg-opacity-10 h-14 w-80 rounded-lg hover:bg-blue-200 duration-200 hover:text-black cursor-pointer border-2 border-solid border-blue-200 font-medium"
              >
                Etkinlikle ilgili görsel değiştir{" "}
                <input
                  onChange={handleChange}
                  name="imageUrl"
                  id="takeImgToEOP2"
                  type="file"
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <label
              htmlFor="takeImgToEOP1"
              className="flex items-center flex-col gap-2.5 justify-center bg-white bg-opacity-10 h-full w-80 rounded-lg hover:bg-blue-200 duration-200 hover:text-black cursor-pointer"
            >
              <i className="fa-regular fa-image text-6xl"></i>
              Etkinlikle ilgili bir görsel ekle{" "}
              <input
                onChange={handleChange}
                name="imageUrl"
                id="takeImgToEOP1"
                type="file"
                className="hidden"
              />
            </label>
          )}
        </div>

        <form className="flex flex-col gap-10">
          <div className="relative">
            <input
              name="name"
              onChange={handleChange}
              className="inputClass !text-white"
              type="text"
            />
            <header className="inputHeader">Etkinlik Adı</header>
          </div>
          <div className="relative">
            <textarea
              name="description"
              onChange={handleChange}
              className="inputClass !text-white resize-none !h-32"
            />
            <header className="inputHeader">Etkinlik Açıklaması</header>
          </div>
          <div className="relative">
            <select
              name="creatorName"
              onChange={handleChange}
              className="inputClass"
            >
              <option value="belirsiz biri">Belirsiz biri</option>
              {DATA.map((friend, i) => (
                <option key={i} value={friend.name}>
                  {friend.name} {friend.surname}
                </option>
              ))}
            </select>
            <header className="inputHeader">Etkinlik Başkanı</header>
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            <div className="relative">
              <input
                name="date"
                onChange={handleChange}
                className="inputClass"
                type="datetime-local"
              />
              <header className="inputHeader">Etkinlik Zamanı</header>
            </div>
            <div className="relative">
              <input
                className="inputClass"
                type="text"
                name="googleMapsLink"
                onChange={handleChange}
                placeholder="Google Maps Linki"
              />
              <header className="inputHeader">Konum</header>
            </div>
            <div className="relative">
              <select
                name="category"
                onChange={handleChange}
                className="inputClass"
              >
                {eventCategories.map((category, i) => (
                  <option key={i} value={category.title}>
                    {category.emo} {category.title}
                  </option>
                ))}
              </select>
              <header className="inputHeader">Kategori</header>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <header className="text-lg">
              <span className="text-orange-500 font-medium">#</span>
              <span className="text-[#f0c1ac]">EkipEtkinlikte</span>
            </header>
            <div className="flex items-center gap-3.5">
              <DhButton
                click={() => closeTheEventOperationCard({ setOperationIsOpen })}
                borRad="rounded-md"
                color="red"
              >
                İptal Et
              </DhButton>
              <DhButton
                click={async (e) => {
                  e.preventDefault();
                  alert("Etkinlik Oluşturuldu!");
                  await createEvent();
                  closeTheEventOperationCard({ setOperationIsOpen });
                }}
                borRad="rounded-md"
                color="blue"
              >
                Etkinliği Oluştur
              </DhButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
