import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Video } from "@@types/video.type";
import { formatVideoCount, formatDate } from "../../../utils/format";
import VideoCardSkeleton from "./VideoCardSkeleton";
import VideoPreviewPlayer from "./VideoPreviewPlayer";
import VideoDropdown from "../VideoDropdown";
import { ThumbnailWrapper, Info, Title, Channel, Stats, Views, Date, TitleRow } from "./styles";
import styled from "styled-components";

const ChannelWrapper = styled.div`
    position: relative;
`;

const ChannelTooltip = styled.div`
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export interface VideoCardProps {
    video?: Video;
    size?: "small" | "medium" | "large";
    isLoading?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, size = "medium", isLoading }) => {
    const navigate = useNavigate();

    const [metadata, setMetadata] = useState({
        isHovered: false,
        isMuted: true,
        showCaptions: false,
        isLoading: false,
    });

    const [showChannelTooltip, setShowChannelTooltip] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setMetadata((prev) => ({ ...prev, isHovered: true, isLoading: true }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        setMetadata((prev) => ({ ...prev, isHovered: false, isLoading: false }));
    }, []);

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setMetadata((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);

    const toggleCaptions = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setMetadata((prev) => ({ ...prev, showCaptions: !prev.showCaptions }));
    }, []);

    const handleChannelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleChannelMouseEnter = () => setShowChannelTooltip(true);
    const handleChannelMouseLeave = () => setShowChannelTooltip(false);

    const handleVideoClick = () => {
        if (video?.videopostId) {
            navigate(`/watch?v=${video.videopostId}`);
        }
    };

    if (isLoading) {
        return <VideoCardSkeleton size={size} />;
    }

    if (!video) return null;

    return (
        <Container size={size} onClick={handleVideoClick}>
            <ThumbnailWrapper>
                <VideoPreviewPlayer
                    thumbnailUrl={video.thumbnailLocation}
                    previewUrl={video.videoLocation}
                    duration={video.runningTime}
                    metadata={metadata}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onToggleMute={toggleMute}
                    onToggleCaptions={toggleCaptions}
                />
            </ThumbnailWrapper>

            <Info>
                <TitleRow>
                    <Title>{video.videopostName}</Title>
                    <VideoDropdown
                        videoId={video.videopostId}
                        handleClose={() => console.error("Function not implemented.")}
                    />
                </TitleRow>
                <ChannelWrapper>
                    <Link
                        to={`/channel/${video.channelId}`}
                        onClick={handleChannelClick}
                        onMouseEnter={handleChannelMouseEnter}
                        onMouseLeave={handleChannelMouseLeave}
                        style={{ textDecoration: "none" }}
                    >
                        <Channel>{video.name}</Channel>
                    </Link>
                    {showChannelTooltip && <ChannelTooltip>{video.name}</ChannelTooltip>}
                </ChannelWrapper>
                <Stats>
                    <Views>{formatVideoCount(video.views)}</Views>
                    <Date>{formatDate(video.createAt)}</Date>
                </Stats>
            </Info>
        </Container>
    );
};

const Container = styled.div<{ size: "small" | "medium" | "large" }>`
    cursor: pointer;
    position: relative;
`;

export default VideoCard;
