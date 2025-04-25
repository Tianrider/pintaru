import { GripVertical } from 'lucide-react';

const GroupHeader = ({ title }: { title: string }) => {
	return (
		<div className='relative w-full items-center gap-2 flex px-4 py-3.5 rounded-lg bg-secondary-yellow/60 shadow-sm hover:shadow-md transition-all duration-200'>
			<div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-[4px] h-8 rounded-r-full bg-secondary-yellow' />
			<GripVertical
				size={20}
				className='opacity-70 text-secondary-yellow'
			/>
			<div className='flex items-center gap-2'>
				<span className='text-[#444444] font-semibold text-lg'>{title}</span>
			</div>
		</div>
	);
};

export default GroupHeader;
