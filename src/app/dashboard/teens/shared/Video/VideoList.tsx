'use client';
import { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import GroupHeader from '../group-header';
import { Pagination } from '@mantine/core';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import MultiSelect from '@/components/ui/multiselect';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import type { VideoDataType } from '@/types/video-types';
import type { Option } from '@/components/ui/multiselect';
import VideoCard from './video-card';
import { getUserVideos } from '@/app/actions/video';
import VideoSkeleton from './video-skeleton';

export type VideoListRef = {
  addTemporaryVideo: (prompt: string) => void;
};

const VideoList = forwardRef<VideoListRef>((props, ref) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<Option[]>([]);
  const queryClient = useQueryClient();
  const itemsPerPage = 6;

  const { data, isLoading, error } = useQuery<VideoDataType[]>({
    queryKey: ['videos'],
    queryFn: async () => {
      const response = await getUserVideos();
      if (!response.videos) {
        return [];
      }
      return response.videos;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

<<<<<<< HEAD
	// Function to add a temporary video entry
	const addTemporaryVideo = (prompt: string) => {
		queryClient.setQueryData<VideoDataType[]>(["videos"], (old) => {
			const tempVideo: VideoDataType = {
				id: Date.now(),
				title: prompt,
				prompt: "Generating video...",
				video_url: "",
				subject: "Processing",
				created_at: new Date().toISOString(),
				user_id: "",
				is_ready: false,
			};
=======
  // Function to add a temporary video entry
  const addTemporaryVideo = (prompt: string) => {
    queryClient.setQueryData<VideoDataType[]>(['videos'], (old) => {
      const tempVideo: VideoDataType = {
        id: Date.now(),
        title: prompt,
        description: 'Generating video...',
        video_url: '',
        subject: 'Processing',
        created_at: new Date().toISOString(),
        user_id: '',
        is_ready: false,
      };
>>>>>>> main

      if (!old) return [tempVideo];
      return [tempVideo, ...old];
    });
  };

  // Expose the addTemporaryVideo method through the ref
  useImperativeHandle(ref, () => ({
    addTemporaryVideo,
  }));

  // Extract unique subjects for the filter dropdown
  const subjects = useMemo(() => {
    if (!data) return [];
    const uniqueSubjects = Array.from(new Set(data.map((video: VideoDataType) => video.subject)));
    return uniqueSubjects.map((subject) => ({
      label: subject,
      value: subject,
    }));
  }, [data]);

  // Filter videos based on search term and selected subjects
  const filteredVideos = useMemo(() => {
    if (!data) return [];
    return data.filter((video: VideoDataType) => {
      const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) || video.subject.toLowerCase().includes(search.toLowerCase());

      const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.some((subject) => subject.value === video.subject);

      return matchesSearch && matchesSubject;
    });
  }, [data, search, selectedSubjects]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const paginatedVideos = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVideos.slice(start, end);
  }, [filteredVideos, page]);

  // Reset to first page when search or subject filter changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSubjectsChange = (options: Option[]) => {
    setSelectedSubjects(options);
    setPage(1);
  };

  return (
    <div className="mt-8 gap-5 flex flex-col">
      <div className="flex justify-between items-center">
        <GroupHeader title="Check Our Collection" />
      </div>
      <div className="flex gap-4 max-w-4xl mx-auto w-full flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[70%] relative h-12">
          <Input placeholder="Search your videos..." className="rounded-full h-full px-11 border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus:border-secondary-yellow text-base" value={search} onChange={handleSearch} />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <Search className="text-gray-400" size={18} />
          </div>
        </div>
        <div className="w-full md:w-[30%]">
          <div className="relative">
            <MultiSelect placeholder="Filter by subjects" options={subjects} value={selectedSubjects} onChange={handleSubjectsChange} className="w-full rounded-full shadow-sm flex px-2 items-center hover:shadow-md transition-all duration-200 text-base h-auto min-h-12" badgeClassName="my-1" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 grid-rows-2">
          {isLoading ? (
            <>
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
            </>
          ) : error ? (
            <div className="col-span-3 text-center text-red-500 py-10 bg-red-50 rounded-lg border border-red-100">
              <p className="font-medium">Failed to load videos</p>
              <p className="text-sm text-red-400 mt-1">Please try again later</p>
            </div>
          ) : paginatedVideos.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-10 bg-gray-50 rounded-lg border border-gray-100">
              <p className="font-medium">No videos found</p>
              <p className="text-sm text-gray-400 mt-1">Try a different search or create a new video</p>
            </div>
          ) : (
            paginatedVideos.map((video: VideoDataType) => <VideoCard key={video.id} videoData={video} />)
          )}
        </div>

<<<<<<< HEAD
				{totalPages > 1 && (
					<div className="flex justify-center my-8">
						<Pagination
							color="#d9a821"
							total={totalPages}
							value={page}
							onChange={setPage}
							radius="xl"
							size="md"
							styles={{
								control: {
									border: "1px solid #e5e7eb",
									"&[dataActive]": {
										backgroundColor: "#d9a821",
										borderColor: "#d9a821",
									},
								},
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
=======
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              color="#d9a821"
              total={totalPages}
              value={page}
              onChange={setPage}
              radius="xl"
              size="md"
              styles={{
                control: {
                  border: '1px solid #e5e7eb',
                  '&[dataActive]': {
                    backgroundColor: '#d9a821',
                    borderColor: '#d9a821',
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
>>>>>>> main
});

VideoList.displayName = 'VideoList';

export default VideoList;
