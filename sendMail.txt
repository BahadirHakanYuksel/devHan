import MyTemplate from "@/components/myTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function GET() {
  try {
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yhakanq123@gmail.com",
      subject: "Hello World",
      react: MyTemplate(),
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
