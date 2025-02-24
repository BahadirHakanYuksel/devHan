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
