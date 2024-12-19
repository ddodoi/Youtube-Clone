import React, { useState } from "react";
import { VideoCardProps } from "../videoCard/types";
import { formatVideoCount, formatDate } from "../../../utils/format";
import { MdVolumeOff, MdVolumeUp, MdSubtitles } from "react-icons/md";
import {
    Container,
    ThumbnailWrapper,
    Thumbnail,
    DurationOverlay,
    Info,
    Title,
    Channel,
    Stats,
    Views,
    Date,
    ControlsContainer,
    ControlButton,
    PreviewOverlay,
} from "../videoCard/styles";

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, size = "medium" }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [showCaptions, setShowCaptions] = useState(false);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted((prev) => !prev);
    };

    const toggleCaptions = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowCaptions((prev) => !prev);
    };

    return (
        <Container size={size} onClick={onClick}>
            <ThumbnailWrapper>
                <Thumbnail src={video.previewUrl || video.thumbnailUrl} alt={video.title} />

                <PreviewOverlay>
                    <ControlsContainer>
                        <ControlButton
                            onClick={toggleMute}
                            aria-label={isMuted ? "음소거 해제" : "음소거"}
                            title={isMuted ? "음소거 해제" : "음소거"}
                        >
                            {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                        </ControlButton>

                        <ControlButton
                            onClick={toggleCaptions}
                            aria-label={showCaptions ? "자막 끄기" : "자막 켜기"}
                            title={showCaptions ? "자막 끄기" : "자막 켜기"}
                        >
                            <MdSubtitles />
                        </ControlButton>
                    </ControlsContainer>

                    {video.duration && <DurationOverlay>{video.duration}</DurationOverlay>}
                </PreviewOverlay>
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
