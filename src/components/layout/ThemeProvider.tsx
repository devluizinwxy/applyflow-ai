"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Extraímos as propriedades originais dinamicamente, sem forçar um caminho interno
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}