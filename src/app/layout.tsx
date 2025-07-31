import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import NavBar from "@/app/(components)/NavBar";
import Cursor from "@/app/(components)/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eleftherios Kourkopoulos",
  description: "Portfolio website of Eleftherios Kourkopoulos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

          {/*Head*/}
          <Head>
              <title>Eleftherios Kourkopoulos</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </Head>

          {/*NavBar*/}
          <NavBar/>

          {/*Custom Cursor*/}
          <Cursor/>

          {children}
      </body>
    </html>
  );
}
