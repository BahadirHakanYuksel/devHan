import { nanoid } from "nanoid";

class friend {
  id: string;
  name: string;
  surname: string;
  age: number;
  birthdayDate: string;
  profilePhoto: string = "";
  department: string = "Handaş";
  constructor(
    id: string,
    name: string,
    surname: string,
    age: number,
    birthdayDate: string,
    profilePhoto: string,
    department?: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.birthdayDate = birthdayDate;
    if (profilePhoto) this.profilePhoto = profilePhoto;
    if (department) this.department = department;
  }
}

let DATA: friend[] = [];

const calculateAge = (birthdayDate: string): number => {
  const today = new Date();
  const birthDate = new Date(birthdayDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const addFriend = (
  id: string,
  name: string,
  surname: string,
  age: number,
  birthdayDate: string,
  profilePhoto: string,
  department?: string
) => {
  DATA.push(
    new friend(id, name, surname, age, birthdayDate, profilePhoto, department)
  );
};
addFriend(
  nanoid(),
  "Ersin Emre",
  "AKCA",
  calculateAge("2003-08-08"),
  "08-08-2003",
  "",
  "Elektrik-Elektronik Mühendisi"
);
addFriend(
  nanoid(),
  "Sadiye Canan",
  "EKENTOK",
  calculateAge("2003-07-03"),
  "03-07-2003",
  "",
  "Bilgisayar Mühendisi"
);
addFriend(
  nanoid(),
  "Burak",
  "ERGÜVEN",
  calculateAge("2003-03-19"),
  "19-03-2003",
  "",
  "Bilgisayar Mühendisi"
);
addFriend(
  nanoid(),
  "Abdulkadir",
  "İNAL",
  calculateAge("2003-05-26"),
  "26-05-2004",
  "",
  "Bilgisayar Mühendisi"
);

addFriend(
  nanoid(),
  "Bahadır Hakan",
  "YÜKSEL",
  calculateAge("2003-04-02"),
  "02-04-2003",
  "/images/bhy.jpg",
  "Bilgisayar Mühendisi"
);

addFriend(
  nanoid(),
  "Umut",
  "YILDIZ",
  calculateAge("2004-08-23"),
  "23-08-2004",
  "",
  "Tıbbi Labaratuvar Teknikeri"
);

export default DATA;

export const welcomeTextArray = [
  "Kodlar uçuşur, kahve taşar,",
  "Developer Hanı’nda sabahı bulan yaşar!",
];
