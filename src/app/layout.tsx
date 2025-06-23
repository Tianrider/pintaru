import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { MantineProvider } from '@/components/MantineProvider';

export const metadata: Metadata = {
  title: 'Pintaru',
  description: 'Pintaru by UINNOVATORS',
  other: {
    'dicoding:email': 'scarryanda@gmail.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <style>{`
					:root { color-scheme: light !important; }
					html { color-scheme: light !important; background-color: white !important; }
					body { background-color: white !important; }
				`}</style>
      </head>
      <body className="antialiased font-sans" style={{ backgroundColor: 'white' }}>
        <Toaster richColors></Toaster>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
