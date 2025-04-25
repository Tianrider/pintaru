import { ChevronRightIcon, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GroupHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="relative w-full justify-between items-center gap-2 flex px-4 py-3.5 rounded-lg  bg-secondary-blue shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex gap-2">
        <VideoIcon size={40} fill="white" className="text-white" />
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-xs lg:w-full w-2/3 lg:text-lg">{title}</span>
        </div>
      </div>

      <div>
        <button
          className="bg-blue-300/50 h-8 px-2 rounded-full w-32 text-white cursor-pointer flex justify-center items-center gap-2"
          onClick={() => {
            router.push('/dashboard/teens/community');
          }}
        >
          <p className="text-sm">Lihat Semua</p>
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default GroupHeader;
