import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Providers } from "@/components/provider";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SageMate - AI Therapy & Mental Health Support | 24/7 Online Counseling",
  description: "Get instant access to AI-powered therapy, emotional support, and mental wellness tools. Private, affordable, and available anytime. Start your healing journey today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       
        <Providers>
          <Header />
          <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}