import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | CPStream",
    default: "CPStream",
  },
  description:
    "Twitch Clone with Next.js, React.js, TailWindCSS & TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {/* Clerk must wrap the app inside body */}
        <ClerkProvider appearance={{ baseTheme: dark }}>
          
          {/* Your app theme system */}
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="CPStream-theme"
          >
            {/* Toast notifications */}
            <Toaster theme="light" position="bottom-center" />

            {/* App pages */}
            {children}
          </ThemeProvider>

        </ClerkProvider>
      </body>
    </html>
  );
}