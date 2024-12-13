import DATA from "@/data";

export const findFriend = (name: string) => {
  console.log("name", name);

  DATA.forEach((friend) => {
    console.log("friend.name", friend.id, "id", name);
  });

  return DATA.find((friend) => convertURLForm(trToEn(friend.name)) === name);
};

export const convertURLForm = (name: string) => {
  return name.toLowerCase().replace(" ", "-");
};

export const trToEn = (name: string) => {
  const turkish = "çÇğĞıİöÖşŞüÜ";
  const english = "cCgGiIoOsSuU";
  const regex = new RegExp("[" + turkish + "]", "g");
  return name.replace(regex, function (m) {
    return english[turkish.indexOf(m)];
  });
};

export const filteredFriends = (name: string) => {
  return DATA.filter(
    (friend) => friend.name.toLowerCase() !== name.toLowerCase()
  );
};
