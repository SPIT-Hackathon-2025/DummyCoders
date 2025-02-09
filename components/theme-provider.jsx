"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures the component only renders after hydration
  }, []);

  if (!mounted) {
    return <>{children}</>; // Prevents mismatches during SSR
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" {...props}>
      {children}
    </NextThemesProvider>
  );
}
