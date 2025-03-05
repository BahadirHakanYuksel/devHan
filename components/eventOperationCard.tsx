import { closeTheEventOperationCard, eventCategories } from "@/lib/event";
import "../app/css_files/eventOperationCard.css";
import DhButton from "./dhButton";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { StoreProps } from "@/lib/app";

interface eventFormInterface {
  name: string;
  description: string;
  date: Date;
  googleMapsLink: string;
  category: string;
  imageUrl: File;
  imageUrlToUI: string;
  creatorId: string;
}

export default function EventOperationCard({
  setOperationIsOpen,
}: {
  setOperationIsOpen: (value: boolean) => void;
}) {
  const { st_user } = useSelector((state: StoreProps) => state.AppStore);

  const [eventForm, setEventForm] = useState<eventFormInterface>({
    name: "",
    description: "",
    date: new Date(),
    googleMapsLink: "",
    category: "Yemek",
    imageUrl: new File([""], ""),
    imageUrlToUI: "",
    creatorId: "",
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

  const createEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(eventForm.creatorId);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventForm.name,
          description: eventForm.description,
          dateTime: eventForm.date,
          googleMapsLink: eventForm.googleMapsLink || "",
          category: eventForm.category,
          eventImg: "",
          participants: [],
          reactions: [],
          creatorId: st_user?.id, // Provide a default value
          creatorName: st_user?.name,
        }),
      });

      if (response.ok) {
        alert("Etkinlik Oluşturuldu!");
        closeTheEventOperationCard({ setOperationIsOpen });
        window.location.reload();
      }
    } catch (error) {
      console.error("Creation error:", error);
    } finally {
      // setLoading(false)
    }

    // const event = new EventBuilder()
    //   .setId()
    //   .setName(eventForm.name)
    //   .setDescription(eventForm.description)
    //   .setDateTime(eventForm.date)
    //   .setGoogleMapsLink(eventForm.googleMapsLink)
    //   .setCategory(eventForm.category)
    //   .setEventImg(eventForm.imageUrlToUI)
    //   .setCreator(eventForm.creatorName)
    //   .build();

    // e.preventDefault();
    // alert("Etkinlik Oluşturuldu!");
    // await createEvent();
    // closeTheEventOperationCard({ setOperationIsOpen });

    // setMyEvents((prevEvents: Event[]) => [...prevEvents, event]);
  };

  // close modal with esc
  useEffect(() => {
    // closeWithEsc
    const closeWithEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTheEventOperationCard({ setOperationIsOpen });
      }
    };
    window.addEventListener("keydown", closeWithEsc);
    return () => {
      // cleanup
      window.removeEventListener("keydown", closeWithEsc);
    };
  }, []);

  return (
    <motion.div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeTheEventOperationCard({ setOperationIsOpen });
        }
      }}
      id="eventOperationCardMain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 bg-black bg-opacity-30 w-full h-screen z-40"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="eventOperationCard"
      >
        <header className="text-2xl text-blue-300 bg-black rounded-t-lg px-7 py-4 border-2 border-b-0 border-blue-300">
          Etkinlik Oluştur
        </header>
        <div className="eop_main">
          <div className="flex flex-col gap-2.5 h-full">
            {eventForm.imageUrl.name ? (
              <>
                <img
                  src={eventForm.imageUrlToUI}
                  className="aspect-square w-full rounded-lg"
                  alt=""
                />
                <label htmlFor="takeImgToEOP2" className="eop_label">
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
              <button
                onClick={() => {
                  alert(
                    "Görsel ekleme özelliği şimdilik kapalı." +
                      "\n" +
                      "Diğer bilgileri girerek, etkinlik oluşturabilirsin :)"
                  );
                }}
                // htmlFor="takeImgToEOP1"
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
              </button>
            )}
          </div>

          <form onSubmit={createEvent} className="flex flex-col gap-10">
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
                className="inputClass !text-white resize-none !h-40"
              />
              <header className="inputHeader">Etkinlik Açıklaması</header>
            </div>
            {/* <div className="relative">
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
            </div> */}
            <div className="eop_bottomInputs">
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
            <div className="eop_footer">
              <header className="text-lg">
                <span className="text-orange-500 font-medium">#</span>
                <span className="text-[#f0c1ac]">EkipEtkinlikte</span>
              </header>
              <div className="flex items-center gap-3.5">
                <DhButton
                  click={() =>
                    closeTheEventOperationCard({ setOperationIsOpen })
                  }
                  borRad="rounded-md"
                  color="red"
                  type="button"
                >
                  İptal Et
                </DhButton>
                <DhButton
                  type="submit"
                  click={() => {}}
                  borRad="rounded-md"
                  color="blue"
                >
                  Etkinliği Oluştur
                </DhButton>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
