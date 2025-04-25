'use client';
import Chat from './components/chat';
import { useState, useRef, useEffect } from 'react';
import { getVideoById } from '@/app/actions/video';
import { VideoDataType } from '@/types/video-types';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoPage() {
  const params = useParams();
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
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
  }, [params.id]);

  // Function to capture the current frame
  const captureFrame = () => {
    if (videoRef.current) {
      // Clear any previous errors
      setError(null);

      const video = videoRef.current;

      try {
        // Check if video has loaded
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          setError('Video not fully loaded. Please wait and try again.');
          return;
        }

        // Get and set current timestamp
        const timestamp = formatTime(video.currentTime);
        setCurrentTimestamp(timestamp);

        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current frame to the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Could not create canvas context');
          return;
        }

        // Draw the current video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a data URL using safer quality settings
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

          // Validate the data URL format before using it
          if (dataUrl.startsWith('data:image/jpeg;base64,')) {
            setImageData(dataUrl);
          } else {
            setError('Invalid data URL format');
          }
        } catch (canvasError) {
          setError('Error creating image from video: ' + (canvasError as Error).message);
          console.error('Canvas error:', canvasError);
        }
      } catch (error) {
        setError('Error capturing video frame');
        console.error('Error capturing video frame:', error);
      }
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
    <div className="h-full px-12 flex flex-col pt-8">
      <div className="w-full flex gap-2 items-center" onClick={() => router.push('/dashboard')}>
        <Button variant="outline" size="icon" onClick={() => router.push('/dashboard')}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        Back
      </div>
      <div className="w-full gap-8 grid py-4 grid-cols-5 h-full">
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
              </div>
            </>
          )}

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        </div>
        <div className="col-span-2 h-full border rounded-lg">
          <Chat imageData={imageData} timestamp={currentTimestamp} />
        </div>
      </div>
    </div>
  );
}
