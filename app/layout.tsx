import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Nav/Navbar";
import AppWalletProvider from "@/components/Nav/WalletContext";
import { Providers } from "@/lib/SessionProvider";
import PhantomWalletContext from "@/components/Nav/PhantomWalletContext";
import { SessionProvider } from "@/components/Nav/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SolXPass",
  description: "Solana Proof of Person Dapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PhantomWalletContext>
        <SessionProvider>
          {/* <Providers>
        <AppWalletProvider> */}
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />
            {children}
          </body>
        </SessionProvider>
      </PhantomWalletContext>
      {/* </AppWalletProvider>
      </Providers> */}
    </html>
  );
}
