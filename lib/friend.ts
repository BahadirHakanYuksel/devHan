import DATA, { friend } from "@/data";

export const findFriend = (name: string): friend => {
  // console.log("name", name);

  // DATA.forEach((friend) => {
  //   console.log("friend.name", friend.id, "id", name);
  // });

  const finding = DATA.find((friend) => {
    return convertURLForm(friend.name) === name;
  });

  if (!finding) {
    throw new Error(`Friend with name ${name} not found`);
  }
  console.log("finding", finding);

  return finding;
};

export const convertURLForm = (name: string) => {
  const url_name = name
    .toLowerCase()
    .split("")
    .map((element) => {
      if (element === " ") {
        return "-";
      }
      return element;
    })
    .join("");
  return trToEn(url_name).trim().toString();
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
