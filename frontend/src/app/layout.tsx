import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "EchoDoc - AI-Powered Patient Care Management",
  description: "Revolutionizing patient care with AI voice cloning technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={montserrat.variable}>
        <head>
          <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </head>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
