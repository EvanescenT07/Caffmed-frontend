import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "@/app/(theme)/theme-providers";
import Navbar from "@/components/navbar/Navbar";
import FloatingChatbot from "@/components/chatbot/Chatbot";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "CaffMedic",
  description:
    "CaffMedic is a platform for detecting brain tumors using machine learning on brain X-ray.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-dark.png",
        href: "/favicon-dark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-light.png",
        href: "/favicon-light.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${JetBrainsMono.variable} relative min-h-screen scroll bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text`}
      >
        <Providers>
          <Navbar />
          <main className="px-4 md:px-8">{children}</main>
        </Providers>
        <FloatingChatbot />
      </body>
    </html>
  );
}
