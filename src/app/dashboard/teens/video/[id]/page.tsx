'use client';
import { useState, useRef, useEffect } from 'react';
import { getVideoById, getUserVideos } from '@/app/actions/video';
import { VideoDataType } from '@/types/video-types';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Chat from './components/chat';

export default function VideoPage() {
  const params = useParams();
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<VideoDataType[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [currentTimestamp, setCurrentTimestamp] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const redirect = useRouter();

  const router = useRouter();

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Fetch video data on component mount
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const videoId = params.id as string;
        const response = await getVideoById(videoId);

        if (response.success && response.video) {
          setVideoData(response.video);
        } else {
          setError(response.error || 'Failed to load video');
          toast.error('Failed to load video');
          redirect.push('/dashboard');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('An error occurred while loading the video');
        toast.error('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [params.id, redirect]);

  // Fetch recommended videos
  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        setLoadingRecommendations(true);
        const response = await getUserVideos();

        if (response.success && response.videos) {
          // Filter out current video and get only ready videos
          const filteredVideos = response.videos.filter((video) => video.id !== Number(params.id) && video.is_ready).slice(0, 3); // Get only 3 videos

          setRecommendedVideos(filteredVideos);
        }
      } catch (err) {
        console.error('Error fetching recommended videos:', err);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    if (!loading && videoData) {
      fetchRecommendedVideos();
    }
  }, [loading, videoData, params.id]);

  // Capture current frame from video when paused
  const captureFrame = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame to the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageData(dataUrl);

        // Also save current timestamp for reference
        setCurrentTimestamp(formatTime(video.currentTime));
      }
    } catch (err) {
      console.error('Error capturing frame:', err);
    }
  };

  // Add pause event listener
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePause = () => {
        captureFrame();
      };

      // Add error handling for video
      const handleVideoError = (e: Event) => {
        setError('Video error: ' + (e as ErrorEvent).message);
        console.error('Video error:', e);
      };

      video.addEventListener('pause', handlePause);
      video.addEventListener('error', handleVideoError);

      return () => {
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, []);

  // Render loading skeleton
  if (loading) {
    return (
      <div className="w-full py-8 gap-8 grid grid-cols-5 px-12">
        <div className="col-span-3">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <div className="mt-4">
            <Skeleton className="w-2/3 h-8 mb-2" />
            <Skeleton className="w-full h-24" />
          </div>
        </div>
        <div className="col-span-2">
          <Skeleton className="w-full h-[70vh]" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit px-12 flex flex-col pt-8 lg:overflow-y-clip">
      <div className="w-full flex gap-2 items-center" onClick={() => router.push('/dashboard')}>
        <Button variant="outline" size="icon" onClick={() => router.push('/dashboard')}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        Back
      </div>
      <div className="w-full gap-8 flex flex-col lg:grid py-4 lg:grid-cols-5 h-fit">
        <div className="col-span-3">
          {videoData && (
            <>
              <div className="relative">
                <video ref={videoRef} src={videoData.video_url} className="w-full h-fit rounded-lg" controls crossOrigin="anonymous" onPause={captureFrame}></video>
                <div className="absolute top-4 right-4 text-xs bg-black/60 text-white p-2 rounded-md">Pause video to analyze the current frame with AI</div>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{videoData.title}</h2>
                <div className="mt-2 text-sm text-gray-500">Subject: {videoData.subject}</div>

                <p className="mt-1 text-gray-700 line-clamp-4 overflow-x-auto">Video Prompt: {videoData.prompt}</p>
                <p className="mt-1 text-gray-700 line-clamp-4 overflow-x-auto ">Upload date: {new Date(videoData.created_at).toLocaleDateString()}</p>

                {/* Recommendation Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Recommended Videos</h3>
                  {loadingRecommendations ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Skeleton className="h-40 w-full rounded-lg" />
                      <Skeleton className="h-40 w-full rounded-lg" />
                      <Skeleton className="h-40 w-full rounded-lg" />
                    </div>
                  ) : recommendedVideos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {recommendedVideos.map((video) => (
                        <div
                          key={video.id}
                          className="h-36 border flex flex-col gap-1 p-1 rounded-lg cursor-pointer"
                          onClick={() => {
                            router.push(`/dashboard/teens/video/${video.id}`);
                          }}
                        >
                          <Image className="w-full rounded-lg" src={video.thumbnail_url || ''} alt={video.title} width={100} height={100} />
                          <p className="text-xs truncate">{video.title}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">No related videos found</p>
                  )}
                </div>
              </div>
            </>
          )}

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        </div>
        <div className="col-span-2 w-full border rounded-lg">
          <Chat imageData={imageData} timestamp={currentTimestamp} />
        </div>
      </div>
    </div>
  );
}
