export class friend {
  id: string;
  name: string;
  surname: string;
  age: number;
  birthdayDate: string;
  profilePhoto: string = "";
  department: string = "Handaş";
  actionNumber: number = 0;
  constructor(
    id: string,
    name: string,
    surname: string,
    age: number,
    birthdayDate: string,
    profilePhoto?: string,
    department?: string,
    actionNumber?: number
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.birthdayDate = birthdayDate;
    if (profilePhoto) this.profilePhoto = profilePhoto;
    if (department) this.department = department;
    if (actionNumber) this.actionNumber = actionNumber;
  }
  addActionNumber() {
    this.actionNumber++;
  }
}
export const navMenu = [
  {
    title: "Etkinlikler",
    path: "/events",
  },
  {
    title: "Feedbacks",
    path: "/feedbacks",
  },
];

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
  new friend(
    "66420",
    "Ersin Emre",
    "AKCA",
    calculateAge("2003-08-08"),
    "08-08-2003",
    "/images/ersin.png",
    "Elektrik-Elektronik Mühendisi"
  ),
  new friend(
    "66421",
    "Sadiye Canan",
    "EKENTOK",
    calculateAge("2003-07-03"),
    "03-07-2003",
    "/images/canan.jpg",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66422",
    "Burak",
    "ERGÜVEN",
    calculateAge("2003-03-19"),
    "19-03-2003",
    "/images/burak.png",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66423",
    "Abdulkadir",
    "İNAL",
    calculateAge("2003-05-26"),
    "26-05-2004",
    "/images/apo.jpg",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66424",
    "Bahadır Hakan",
    "YÜKSEL",
    calculateAge("2003-04-02"),
    "02-04-2003",
    "/images/bhy.jpg",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66425",
    "Umut",
    "YILDIZ",
    calculateAge("2004-08-23"),
    "23-08-2004",
    "/images/umut.jpg",
    "Tıbbi Laboratuvar Teknikeri"
  ),
  new friend(
    "66426",
    "Ensar",
    "",
    calculateAge("2004-10-05"),
    "05-10-2004",
    "/images/ensar.jpg",
    "Elektrik-Elektronik Mühendisi"
  ),
];
export default DATA;

export const welcomeTextArray = [
  "Kodlar uçuşur, kahve taşar,",
  "Developer Hanı’nda sabahı bulan yaşar!",
];
