'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './shared/Navbar/Navbar';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='bg-white'>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<div className='px-3 md:px-10 lg:px-20 md:pt-10 pb-32 md:pb-10 bg-white'>
					<div className='max-w-6xl pb-10 mx-auto'>
						<div className='flex flex-col gap-6'>{children}</div>
					</div>
				</div>
			</QueryClientProvider>
		</div>
	);
}
