import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/Providers";

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
      <head>
        {/* Font Awesome CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="p-5 relative">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
