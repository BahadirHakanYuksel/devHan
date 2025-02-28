import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validasyon
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email ve şifre zorunludur" },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = await prisma.friends.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Geçersiz kimlik bilgileri" },
        { status: 401 }
      );
    }

    // Şifre kontrolü
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Geçersiz kimlik bilgileri" },
        { status: 401 }
      );
    }

    // Giriş başarılı - actionNumber = 1
    const updatedUser = await prisma.friends.update({
      where: { id: user.id },
      data: { actionNumber: 1 },
    });

    // Giriş başarılı - JWT token veya session oluştur
    const { password: userPassword, ...safeUser } = updatedUser;
    void userPassword; // Kullanılmayan değişkeni "kullanmış" gibi yapar

    return NextResponse.json(
      { success: true, user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
