import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

interface eventProps {
  name: string;
  description: string;
  dateTime: Date;
  googleMapsLink: string | null;
  category: string | null;
  eventImg: string | null;
  participants: string[];
  reactions: string[];
  creatorId: string | null; // Provide a default value
  creatorName: string | null;
}

export async function POST(request: Request) {
  try {
    const body: eventProps = await request.json();

    // Zorunlu alan kontrolü
    if (!body.name || !body.dateTime || !body.creatorId) {
      return NextResponse.json(
        { error: "Name, dateTime and creatorName are required" },
        { status: 400 }
      );
    } else {
      const newEvent = await prisma.events.create({
        data: {
          name: body.name,
          description:
            body.description || "Lafı uzatmaya gerek yok, katılın ve eğlenin!",
          dateTime: new Date(body.dateTime),
          googleMapsLink: body.googleMapsLink || "",
          category: body.category || "",
          eventImg: body.eventImg || "",
          participants: [],
          reactions: [],
          creatorId: body.creatorId,
          createdAt: new Date(),
          uploadedAt: new Date(),
          creatorName: body.creatorName || "",
        },
      });

      return NextResponse.json(newEvent, { status: 201 });
    }
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const eventId = searchParams.get("id");
    const creatorId = searchParams.get("creatorId");
    if (eventId) {
      const event = await prisma.events.findUnique({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    }
    if (creatorId) {
      const events = await prisma.events.findMany({
        where: {
          creatorId: creatorId,
        },
        orderBy: {
          dateTime: "asc",
        },
      });

      return NextResponse.json({
        events: events,
        status: 200,
        message: "Events by createdId fetched successfully",
      });
    }

    const events = await prisma.events.findMany({
      orderBy: {
        dateTime: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
