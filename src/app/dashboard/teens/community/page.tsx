import { VideoIcon } from 'lucide-react';
import VideoList from '../shared/Video/VideoList';

export default function CommunityPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Banner />
      <VideoList isCommunity />
    </div>
  );
}

const Banner = () => {
  return (
    <div className="w-full h-20 bg-primary-blue align-middle rounded-lg flex items-center text-5xl gap-3 justify-center text-white font-bold">
      <VideoIcon size={65} fill="#5DADFE" className="text-[#5DADFE]" />
      <p className="align-middle inline-block">Community Library</p>
    </div>
  );
};
