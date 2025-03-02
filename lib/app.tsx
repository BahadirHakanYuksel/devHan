import { AppStoreProps } from "@/stores/app";

export const createSlug = (title: string): string => {
  return title
    .toLowerCase() // Küçük harfe çevir
    .normalize("NFD") // Unicode normalizasyonu, Türkçe karakterler için
    .replace(/[\u0300-\u036f]/g, "") // Türkçe karakterlerin normalizasyonu
    .replace(/[^a-z0-9\s-]/g, "") // Sadece harf, rakam ve boşluk/tireyi kabul et
    .trim() // Başlangıç ve sondaki boşlukları temizle
    .replace(/\s+/g, "-") // Birden fazla boşluk yerine tek bir tire koy
    .replace(/-+/g, "-"); // Birden fazla tireyi tek tireye dönüştür
};

export const generateRandomId = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const dateTimeConvertToDate = (dateTime: string): string => {
  dateTime = dateTime.split("T")[0];
  const date = dateTime.split("-");
  return `${date[2]}.${date[1]}.${date[0]}`;
};

export interface StoreProps {
  AppStore: AppStoreProps;
}

export const allFirstLetterCapitalize = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const findProfileImage = (profilePhoto: string) => {
  if (profilePhoto.includes("abdulkadir")) return "/images/abdulkadir-inal.jpg";
  else if (profilePhoto.includes("burak")) return "/images/burak-inal.jpg";
};

export const getUserInfoAboutEvent = async (id: string) => {
  try {
    const responseToUser = await fetch(
      `/api/users?info-to-event=${encodeURIComponent(id)}`
    );

    if (!responseToUser.ok) throw new Error("Boyle biri yok - event");
    const dataToUser = await responseToUser.json();
    return {
      name: dataToUser.users[0].name,
      username: dataToUser.users[0].username,
    };
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getUsers = async () => {
  try {
    const responseToUser = await fetch(`/api/users`);

    if (!responseToUser.ok) throw new Error("Boyle biri yok - event");

    return responseToUser.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
