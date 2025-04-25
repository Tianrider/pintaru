"use client";
import ProfileSection from "./shared/ProfileSection/ProfileSection";
import PromptBar from "./shared/PromptBar/PromptBar";
import VideoList from "./shared/Video/VideoList";
import {useRef} from "react";
import type {VideoListRef} from "./shared/Video/VideoList";
import {generateVideo} from "@/app/actions/video";
import {toast} from "sonner";

export default function Dashboard() {
	const videoListRef = useRef<VideoListRef>(null);

	const handleVideoRequest = async (prompt: string, image?: File) => {
		videoListRef.current?.addTemporaryVideo(prompt);

		try {
			await generateVideo(prompt, image);
			// The VideoList will automatically update via React Query when the new video is added
		} catch (error) {
			toast.error("Failed to generate video. Please try again.");
			console.error("Error generating video:", error);
		}
	};

	return (
		<>
			<ProfileSection />
			<PromptBar onVideoRequest={handleVideoRequest} />
			{/* <Banner /> */}
			<VideoList ref={videoListRef} />
		</>
	);
}
