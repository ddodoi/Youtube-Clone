import React from "react";
import VideoCard from "../videoCard/VideoCard";
import { VideoGridProps } from "../videoGrid/types";
import { GridContainer } from "../videoGrid/styles";

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoClick, size = "medium" }) => {
    return (
        <GridContainer>
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    video={video}
                    size={size}
                    onClick={() => onVideoClick?.(video)}
                />
            ))}
        </GridContainer>
    );
};

export default VideoGrid;
