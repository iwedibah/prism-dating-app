import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PRISM — Every Color. Every Person. One Platform.",
  description: "The inclusive social dating platform for all sexualities. Meet, connect, post, and discover people near you — or in your next travel destination.",
  keywords: ["dating app", "LGBT dating", "inclusive social platform", "gay dating Nigeria", "queer social app"],
  openGraph: {
    title: "PRISM",
    description: "Every Color. Every Person. One Platform.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-theme="dark">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
