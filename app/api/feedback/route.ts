import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { feedback, name } = await req.json();

    const newFeedback = await prisma.feedback.create({
      data: {
        name: name,
        message: feedback,
      },
    });

    return NextResponse.json(newFeedback, { status: 200 });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Feedback submission failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Veritabanından geri bildirimleri çekiyoruz
    const feedbacks = await prisma.feedback.findMany({
      select: {
        id: true,
        name: true,
        message: true,
        createdAt: true, // Gönderilme tarihini de seçiyoruz
      },
      orderBy: {
        createdAt: "desc", // En son gönderilen geri bildirim en üstte olacak şekilde sıralıyoruz
      },
    });

    // Tarih formatlama (Opsiyonel)
    const formattedFeedbacks = feedbacks.map((feedback) => ({
      ...feedback,
      createdAt: new Intl.DateTimeFormat("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24 saat formatı için
        timeZone: "Europe/Istanbul", // Türkiye saati dilimi
      })
        .format(new Date(feedback.createdAt))
        .replace(",", "-"),
    }));

    return NextResponse.json(formattedFeedbacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}
