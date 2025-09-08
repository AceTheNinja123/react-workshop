"use client"
import { ThemeSettings } from "@/theme";
import { ThemeProvider } from "@mui/material";

export function ThemeReactProvider({ children, }: { children: React.ReactNode }) {
    const theme = ThemeSettings();
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}