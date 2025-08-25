import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Uboot Bearers',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
              U-Boot Bearers
            </Link>
            <div className="flex gap-4">
              <Link href="/s-class" className="text-gray-300 hover:text-white">
                S-Class
              </Link>
              <Link href="/tutorial" className="text-gray-300 hover:text-white">
                Tutorial
              </Link>
              <Link
                href="/character-sheet"
                className="text-gray-300 hover:text-white"
              >
                Character Sheet
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
