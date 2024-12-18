import React, { useState } from "react";
import { VideoCardProps } from "../videoCard/types";
import {
    Container,
    ThumbnailWrapper,
    Thumbnail,
    DurationOverlay,
    PreviewWrapper,
    Info,
    Title,
    Channel,
    Stats,
    Views,
    Date,
} from "../videoCard/styles";
import { formatVideoCount, formatDate } from "../../../utils/format";

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, size = "medium" }) => {
    const [isHovering, setIsHovering] = useState(false);
    const previewUrl = "/api/placeholder/320/180"; // 실제로는 비디오 미리보기 URL이 들어갈 자리

    return (
        <Container
            size={size}
            onClick={onClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <ThumbnailWrapper>
                {isHovering ? (
                    <PreviewWrapper>
                        <video
                            src={previewUrl}
                            autoPlay
                            muted
                            loop
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </PreviewWrapper>
                ) : (
                    <>
                        <Thumbnail src={video.thumbnailUrl} alt={video.title} />
                        <DurationOverlay>{video.duration}</DurationOverlay>
                    </>
                )}
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
