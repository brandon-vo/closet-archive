import type { Metadata } from "next";
import { cabin } from "@/constants/Fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtual Closet",
  description: "A web app to help manage your wardrobe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cabin.className}>{children}</body>
    </html>
  );
}
