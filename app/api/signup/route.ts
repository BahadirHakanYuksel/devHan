import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prismadb";

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

    // Kullanıcı oluştur
    prisma.friends.create({
      data: {
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: hashedPassword,
        birthdayDate: birthdayDate,
        profilePhoto: profilePhoto,
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
