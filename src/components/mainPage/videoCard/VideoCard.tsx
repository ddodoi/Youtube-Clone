import React, { useState, useCallback } from "react";
import { VideoCardProps } from "./types";
import { formatVideoCount, formatDate } from "../../../utils/format";
import VideoPreviewPlayer from "./VIdeoPreviewPlayer";
import VideoCardSkeleton from "./VIdeoCardSkeleton";
import {
    Container,
    ThumbnailWrapper,
    Info,
    Title,
    Channel,
    Stats,
    Views,
    Date,
} from "./styles";

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, size = "medium", isLoading }) => {
    const [metadata, setMetadata] = useState({
        isHovered: false,
        isMuted: true,
        showCaptions: false,
        isLoading: false
    });

    const handleMouseEnter = useCallback(() => {
        setMetadata(prev => ({ ...prev, isHovered: true, isLoading: true }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        setMetadata(prev => ({ ...prev, isHovered: false, isLoading: false }));
    }, []);

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setMetadata(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);

    const toggleCaptions = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setMetadata(prev => ({ ...prev, showCaptions: !prev.showCaptions }));
    }, []);

    if (isLoading) {
        return <VideoCardSkeleton size={size} />;
    }

    return (
        <Container size={size} onClick={onClick}>
            <ThumbnailWrapper>
                <VideoPreviewPlayer 
                    thumbnailUrl={video.thumbnailUrl}
                    previewUrl={video.previewUrl}
                    metadata={metadata}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onToggleMute={toggleMute}
                    onToggleCaptions={toggleCaptions}
                    duration={video.duration}
                />
            </ThumbnailWrapper>

            <Info>
                <Title>{video.title}</Title>
                <Channel>{video.channel}</Channel>
                <Stats>
                    <Views>{formatVideoCount(video.viewCount)} • </Views>
                    <Date>{formatDate(video.createdAt)}</Date>
                </Stats>
            </Info>
        </Container>
    );
};

export default VideoCard;