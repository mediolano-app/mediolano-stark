import type { Metadata } from "next";
import { ScaffoldStarkAppWithProviders } from "~~/components/ScaffoldStarkAppWithProviders";
import "~~/styles/globals.css";
import { ThemeProvider } from "~~/components/ThemeProvider";

import { Inter } from 'next/font/google'
import ImprovedAnimatedBackground from '~~/components/ImprovedAnimatedBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Mediolano.app",
  description: "Your gateway to own your intelectual properties",
  icons: "/logo.ico",
};

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
      <ImprovedAnimatedBackground />
        <ThemeProvider enableSystem>
          <ScaffoldStarkAppWithProviders>
            {children}
          </ScaffoldStarkAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldStarkApp;
