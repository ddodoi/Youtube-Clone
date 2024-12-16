import React from "react";
import { VideoCardProps } from "../../../types/videoCard.types";
import { 
    Container, 
    Thumbnail, 
    ThumbnailWrapper,
    Duration,
    Info, 
    Title, 
    Channel, 
    Stats, 
    Views, 
    Date 
} from "../../../style/videoCard.styles";
import { formatVideoCount, formatDate } from "../../../utils/format";

const VideoCard: React.FC<VideoCardProps> = ({ 
    video, 
    onClick,
    size = 'medium'
}) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <Container onClick={handleClick} size={size}>
            <ThumbnailWrapper>
                <Thumbnail src={video.thumbnailUrl} alt={video.title} />
                <Duration>{video.duration}</Duration>
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