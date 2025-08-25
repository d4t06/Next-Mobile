import type { Metadata } from "next";
import localFont from "next/font/local";
import AuthProvider from "@/stores/SessionContext";
import "./globals.css";
import "./styles.scss";
import CompareProvider from "@/stores/CompareContext";
import defaultTheme from "tailwindcss/defaultTheme";

const _font = localFont({
  src: "./Comfortaa-VariableFont.ttf",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "Dspec",
  description: "Laptop and mobile specifications",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            _font.style.fontFamily + "," + defaultTheme.fontFamily.sans.join(","),
        }}
      >
        <AuthProvider>
          <CompareProvider>
            {children}
            <div id="portals"></div>
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
