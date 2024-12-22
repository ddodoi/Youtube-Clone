import React from "react";
import VideoCard from "../videoCard/VideoCard";
import { GridContainer } from "../videoGrid/styles";
import { Video } from "@@types/video.type";

export interface VideoGridProps {
    videos: Video[];
    size?: "small" | "medium" | "large";
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, size = "medium" }) => {
    return (
        <GridContainer>
            {videos.map((video) => (
                <VideoCard key={video.videopostId} video={video} size={size} />
            ))}
        </GridContainer>
    );
};

export default VideoGrid;
