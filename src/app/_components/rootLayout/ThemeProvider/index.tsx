"use client";

import * as React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

// Leo: we can use https://zenoo.github.io/mui-theme-creator/
// to create a theme and then copy the code here

const theme = createTheme(
  {
    palette: {
      mode: "dark",
    },
  },
  ptBR
);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <MUIThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
