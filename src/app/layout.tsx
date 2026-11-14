import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const leagueSpartan = localFont({
  src: "./fonts/LeagueSpartan-Variable.ttf",
  variable: "--font-league-spartan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omar | AI Designer, AI Video Maker & Video Editor",
  description: "AI design, AI video creation, and video editing by Omar. AI Production Manager & AI Designer at Mundo Media, with a background in machine learning and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${leagueSpartan.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
