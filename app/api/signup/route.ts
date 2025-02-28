import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prismadb";
import DATA from "@/data";
import { convertURLForm } from "@/lib/friend";

export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      name,
      surname,
      username,
      birthdayDate,
      gender,
      department,
      profilePhoto,
    } = await request.json();

    // Gerekli alan kontrolü
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tüm alanları doldurun" },
        { status: 400 }
      );
    }

    // Email kontrolü
    const existingUser = await prisma.friends.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email zaten kayıtlı" },
        { status: 409 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    const otoUploadPhoto = (name: string, surname: string) => {
      const isHere = DATA.filter(
        (db) => db.name === name && db.surname === surname
      );

      if (isHere) {
        const imgName = convertURLForm(name + " " + surname);
        const dotName =
          (name + " " + surname).toLowerCase().trim() === "ersin emre akca" ||
          (name + " " + surname).toLowerCase().trim() === "burak ergüven"
            ? ".png"
            : ".jpg";
        return imgName + dotName;
      }
    };

    const img_url = otoUploadPhoto(name, surname);

    // Kullanıcı oluştur
    await prisma.friends.create({
      data: {
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: hashedPassword,
        birthdayDate: birthdayDate,
        profilePhoto:
          img_url !== null && img_url !== undefined ? img_url : profilePhoto,
        department: department,
        gender: gender,
        actionNumber: 0, // or any default value
      },
    });

    // Şifreyi response'tan çıkar
    // const { password: _, ...safeUser } = user;

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
