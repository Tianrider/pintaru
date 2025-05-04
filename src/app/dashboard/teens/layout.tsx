'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './shared/Navbar/Navbar';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="bg-white pt-20 sm:pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">{children}</div>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}
