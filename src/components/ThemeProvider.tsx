import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="open-geo-theme" {...props}>
      {children}
    </NextThemesProvider>
  );
};
