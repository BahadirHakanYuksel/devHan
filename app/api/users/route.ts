import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    // Validasyon
    // if (!name || name.trim().length < 2) {
    //   return NextResponse.json(
    //     { success: false, message: "En az 2 karakter girin" },
    //     { status: 400 }
    //   );
    // }

    let users;

    if (name === null || name === undefined || name === "") {
      users = await prisma.friends.findMany({
        select: {
          id: true,
          name: true,
          surname: true,
          profilePhoto: true,
          department: true,
          birthdayDate: true,
          actionNumber: true,
          email: true,
          eventsAttended: true,
          gender: true,
        },
      });
    } else {
      users = await prisma.friends.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive", // Büyük/küçük harf duyarsız
          },
        },
        select: {
          id: true,
          name: true,
          surname: true,
          profilePhoto: true,
          actionNumber: true,
          department: true,
          birthdayDate: true,
          gender: true,

          // Şifre gibi hassas alanları dışarıda bırak
        },
      });
    }
    // Kullanıcıları ara

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Arama hatası:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
