import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Head from "next/head";

// const inter = Inter({ subsets: ["latin"] });
const rilenoSans = localFont({
  src: [
    {
      path: 'assets/rileno-sans/RilenoSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'assets/rileno-sans/RilenoSans-Light.woff',
      weight: '400',
      style: 'bold',
    },
    {
      path: 'assets/rileno-sans/RilenoSans-SemiBold.woff',
      weight: '600',
      style: 'bold',
    },
  ]});

export const metadata: Metadata = {
  title: "Welcome to mcom - Make love possible",
  icons: "",
  description: "Share your love story and be among 3 lucky couples to win an all-expense-paid dinner this Valentine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <body className={`${rilenoSans.className} "bg-white"`}>{children}</body>
    </html>
  );
}
