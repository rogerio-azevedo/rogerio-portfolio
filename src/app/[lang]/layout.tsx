import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Locale } from './dictionaries'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AIAgent from "@/components/AIAgent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [
    { lang: 'pt' },
    { lang: 'en' }, 
    { lang: 'es' }
  ]
}

export const metadata: Metadata = {
  title: "Rogério Silva - Full Stack Developer",
  description: "Full Stack Developer & Software Engineer specialized in React, Next.js, and modern web technologies. Building scalable applications and innovative solutions.",
  keywords: ["full stack developer", "react", "nextjs", "typescript", "software engineer"],
  authors: [{ name: "Rogério Silva" }],
  creator: "Rogério Silva",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    title: "Rogério Silva - Full Stack Developer",
    description: "Full Stack Developer & Software Engineer specialized in React, Next.js, and modern web technologies.",
    siteName: "Rogério Silva Portfolio",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageSwitcher currentLang={lang} />
        {children}
        <AIAgent />
      </body>
    </html>
  );
} 