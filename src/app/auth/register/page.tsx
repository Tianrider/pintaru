import { SignUpPage } from '@/components/ui/sign-up';
import Image from 'next/image';

export default function Register() {
	return (
		<div className='w-full h-screen flex overflow-hidden'>
			<div className='hidden h-full md:flex md:w-1/2 lg:w-7/12 bg-black relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10'></div>
				<Image
					src={
						'https://images.unsplash.com/photo-1625111381887-458fce74a923?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					}
					alt='register'
					width={1742}
					height={1080}
					className='w-full h-full object-cover object-center transition-transform duration-10000 hover:scale-110'
					priority
				/>
				<div className='absolute bottom-8 left-8 z-20 max-w-md'>
					<h2 className='text-white text-3xl font-bold mb-4'>
						Join Jawab.in Today
					</h2>
					<p className='text-white/80 text-lg'>
						Create an account to connect with a community of experts and get
						answers to your questions.
					</p>
				</div>
			</div>
			<div className='flex flex-col w-full md:w-1/2 lg:w-5/12 justify-center items-center bg-white py-10 md:py-0'>
				<SignUpPage />
			</div>
		</div>
	);
}
