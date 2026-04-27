import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientSessionProvider from "./clientSessionProvider";
import { ThemeProvider } from "./ThemeContext";
import Notifikasi from "@/components/Notifikasi";
import QueryProvider from "./QueryProvider";
import ConfirmationBox from "@/components/ConfirmationBox";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
  title:
    "Universitas Internasional Batam",
  description:
    "Sistem Pendaftaran Mahasiswa Baru Universitas Internasional Batam",
  icons: {
    icon: "/logo/uib.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-poppins antialiased",
          poppins.variable
        )}
      >
        <ThemeProvider>
          <ClientSessionProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
            <Notifikasi />
            <ConfirmationBox />
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}