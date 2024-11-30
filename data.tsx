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

let DATA: friend[] = [
  {
    id: nanoid(),
    name: "Ersin Emre",
    surname: "AKCA",
    age: calculateAge("2003-08-08"),
    birthdayDate: "08-08-2003",
    profilePhoto: "",
    department: "Elektrik-Elektronik Mühendisi",
  },
  {
    id: nanoid(),
    name: "Sadiye Canan",
    surname: "EKENTOK",
    age: calculateAge("2003-07-03"),
    birthdayDate: "03-07-2003",
    profilePhoto: "/images/canan.jpg",
    department: "Bilgisayar Mühendisi",
  },
  {
    id: nanoid(),
    name: "Burak",
    surname: "ERGÜVEN",
    age: calculateAge("2003-03-19"),
    birthdayDate: "19-03-2003",
    profilePhoto: "",
    department: "Bilgisayar Mühendisi",
  },
  {
    id: nanoid(),
    name: "Abdulkadir",
    surname: "İNAL",
    age: calculateAge("2003-05-26"),
    birthdayDate: "26-05-2004",
    profilePhoto: "",
    department: "Bilgisayar Mühendisi",
  },
  {
    id: nanoid(),
    name: "Bahadır Hakan",
    surname: "YÜKSEL",
    age: calculateAge("2003-04-02"),
    birthdayDate: "02-04-2003",
    profilePhoto: "/images/bhy.jpg",
    department: "Bilgisayar Mühendisi",
  },
  {
    id: nanoid(),
    name: "Umut",
    surname: "YILDIZ",
    age: calculateAge("2004-08-23"),
    birthdayDate: "23-08-2004",
    profilePhoto: "",
    department: "Tıbbi Laboratuvar Teknikeri",
  },
];
export default DATA;

export const welcomeTextArray = [
  "Kodlar uçuşur, kahve taşar,",
  "Developer Hanı’nda sabahı bulan yaşar!",
];
