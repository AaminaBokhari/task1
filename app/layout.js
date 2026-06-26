import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import ThemeScript from "@/components/ThemeScript/ThemeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "F — AI Content Studio",
  description: "Generate AI images and videos from your imagination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
