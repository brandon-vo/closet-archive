"use client";

import { cabin } from "@/constants/Fonts";
import "./globals.css";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body className={cabin.className}>{children}</body>
      </html>
    </RecoilRoot>
  );
}
