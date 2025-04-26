'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './shared/Navbar/Navbar';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white h-screen">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="bg-white h-full pt-10 lg:pt-16">
          <div className="max-w-6xl mx-auto h-full">
            <div className="flex flex-col gap-6 h-full">{children}</div>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}
