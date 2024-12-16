import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Developer Hanı",
  description: "Don't forget your friends birthdays!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-5">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
