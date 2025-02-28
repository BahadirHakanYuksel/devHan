export class friend implements Friend {
  username?: string;
  id: string;
  name: string;
  surname: string;
  age?: number;
  birthdayDate: string;
  profilePhoto: string = "";
  department: string = "Handaş";
  actionNumber: number = 0;
  eventsAttended: string[] = [];
  email: string = "";
  password?: string = "";
  gender: string = "";
  constructor(
    id: string,
    name: string,
    surname: string,
    age: number,
    birthdayDate: string,
    profilePhoto?: string,
    department?: string,
    actionNumber?: number,
    email?: string,
    password?: string,
    gender?: string,
    username?: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.birthdayDate = birthdayDate;

    if (profilePhoto) this.profilePhoto = profilePhoto;
    if (department) this.department = department;
    if (actionNumber) this.actionNumber = actionNumber;
    if (email) this.email = email;
    if (password) this.password = password;
    if (gender) this.gender = gender;
    if (username) this.username = username;
  }
  addActionNumber() {
    this.actionNumber++;
  }
  addEvent(eventId: string) {
    if (this.eventsAttended.includes(eventId)) return;
    this.eventsAttended.push(eventId);
  }
  removeEvent(eventId: string) {
    this.eventsAttended = this.eventsAttended.filter(
      (event) => event !== eventId
    );
  }
  setEmail(email: string) {
    this.email = email;
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

export const calculateAge = (birthdateStr: string): number => {
  // Tarihi parçalara ayır (GG.AA.YYYY formatında)
  const [gun, ay, yil] = birthdateStr.split(".").map(Number);

  // JavaScript Date nesnesi (aylar 0-11 arası olduğu için ay - 1)
  const dogumTarihi = new Date(yil, ay - 1, gun);

  const bugun = new Date();

  // Temel yaş hesaplama
  let yas = bugun.getFullYear() - dogumTarihi.getFullYear();

  // Doğum günü kontrolü (ay ve gün karşılaştırması)
  const buAy = bugun.getMonth();
  const buGun = bugun.getDate();

  if (
    buAy < dogumTarihi.getMonth() ||
    (buAy === dogumTarihi.getMonth() && buGun < dogumTarihi.getDate())
  ) {
    yas--;
  }

  return yas;
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
    "2003-08-08",
    "/images/ersin.png",
    "Elektrik-Elektronik Mühendisi"
  ),
  new friend(
    "66421",
    "Sadiye Canan",
    "EKENTOK",
    calculateAge("2003-07-03"),
    "2003-07-03",
    "/images/canan.jpg",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66422",
    "Burak",
    "ERGÜVEN",
    calculateAge("2003-03-19"),
    "2003-03-19",
    "/images/burak.png",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66423",
    "Abdulkadir",
    "İNAL",
    calculateAge("2003-05-26"),
    "2003-05-26",
    "/images/apo.jpg",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66424",
    "Bahadır Hakan",
    "YÜKSEL",
    calculateAge("2003-04-02"),
    "2003-04-02",
    "/images/bhy.jpg",
    "Bilgisayar Mühendisi"
  ),
  new friend(
    "66425",
    "Umut",
    "YILDIZ",
    calculateAge("2004-08-23"),
    "2004-08-23",
    "/images/umut.jpg",
    "Tıbbi Laboratuvar Teknikeri"
  ),
  new friend(
    "66426",
    "Ensar",
    "",
    calculateAge("2004-10-05"),
    "2004-10-05",
    "/images/ensar.jpg",
    "Elektrik-Elektronik Mühendisi"
  ),
];
export default DATA;

export const welcomeTextArray = [
  "Kodlar uçuşur, kahve taşar,",
  "Developer Hanı’nda sabahı bulan yaşar!",
];

export interface Friend {
  id: string;
  name: string;
  surname: string;
  age?: number;
  birthdayDate: string | Date;
  profilePhoto: string;
  department: string;
  actionNumber: number;
  addActionNumber?: () => void;
  eventsAttended: string[];
  email: string;
  password?: string;
  gender: string;
  username?: string;
}
