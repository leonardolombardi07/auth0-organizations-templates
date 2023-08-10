import * as React from "react";
import "./globals.css";
import { Roboto } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import ThemeProvider from "@/app/_components/rootLayout/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { Metadata } from "next";
import AuthenticatedLayout from "./_components/rootLayout/AuthenticatedLayout";

export const metadata: Metadata = {
  title: "Auth0 | Orgs",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={roboto.className}>
          <ThemeProvider>
            <CssBaseline />
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
