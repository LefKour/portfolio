import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { LoadingProvider } from "@/lib/hooks/useLoadingContext";
import LayoutContent from "@/app/(components)/LayoutContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
})

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
            className={`${spaceGrotesk.variable}  antialiased`}
            suppressHydrationWarning={true}
          >
              {/*Head*/}
              <Head>
                  <title>Eleftherios Kourkopoulos</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              </Head>

              <LoadingProvider>
                <LayoutContent>
                  {children}
                </LayoutContent>
              </LoadingProvider>
          </body>
        </html>
  );
}
