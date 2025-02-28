import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    // Kullanıcıyı bul ve actionNumber'ı 0 yap
    const updatedUser = await prisma.friends.update({
      where: { id: userId },
      data: { actionNumber: 0 },
    });

    // Çıkış işlemi başarılı
    return NextResponse.json(
      { success: true, message: "Çıkış başarılı", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Çıkış hatası:", error);
    return NextResponse.json(
      { success: false, message: "Çıkış sırasında hata" },
      { status: 500 }
    );
  }
}

// FRONTEND

// const handleLogout = async () => {
//     try {
//       // Kullanıcı bilgilerini localStorage'dan al
//       const user = JSON.parse(localStorage.getItem('user') || {}
//       const userId = user.id

//       if (!userId) {
//         throw new Error('Kullanıcı bilgisi bulunamadı')
//       }

//       // Logout API'sini çağır
//       const response = await fetch('/api/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       })

//       if (response.ok) {
//         // Client-side temizlik
//         localStorage.removeItem('user')
//         localStorage.removeItem('token')
//         window.location.href = '/login'
//       } else {
//         throw new Error('Çıkış sırasında hata')
//       }

//     } catch (error) {
//       console.error('Çıkış hatası:', error)
//       alert(error instanceof Error ? error.message : 'Beklenmeyen hata')
//     }
//   }

//   // Kullanım örneği
//   <button onClick={handleLogout}>Çıkış Yap</button>
