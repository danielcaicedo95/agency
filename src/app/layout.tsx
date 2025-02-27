// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Fuente personalizada solo para el logo
const miFuenteLogo = localFont({
  src: './fonts/BILLO.woff2',
  variable: '--fuente-logo',
});

export const metadata: Metadata = {
  title: 'Mi Marca Marketing',
  description: 'Creamos comerciales que inspiran y venden',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={miFuenteLogo.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
  
}