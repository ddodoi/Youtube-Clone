import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { VideoCardProps } from "./types";
import { formatVideoCount, formatDate } from "../../../utils/format";
import VideoCardSkeleton from "./VideoCardSkeleton";
import VideoPreviewPlayer from "./VideoPreviewPlayer";
import VideoDropdown from "../VideoDropdown";
import {
    Container,
    ThumbnailWrapper,
    Info,
    Title,
    Channel,
    Stats,
    Views,
    Date,
    TitleRow,
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

    const handleChannelClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 비디오 카드 클릭 이벤트가 발생하지 않도록 방지
    };

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
                <TitleRow>
                    <Title>{video.title}</Title>
                    <VideoDropdown videoId={video.id} />
                </TitleRow>
                <Link 
                    to={`/channel/${video.channelId}`} 
                    onClick={handleChannelClick}
                    style={{ textDecoration: 'none' }}
                >
                    <Channel>{video.channel}</Channel>
                </Link>
                <Stats>
                    <Views>{formatVideoCount(video.viewCount)} • </Views>
                    <Date>{formatDate(video.createdAt)}</Date>
                </Stats>
            </Info>
        </Container>
    );
};

export default VideoCard;