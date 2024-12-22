import VideoDropdown from '@components/mainPage/VideoDropdown';
import { Video } from '../../../types/video.type';
import { formatVideoCount, formatDate } from '../../../utils/format';
import styled from 'styled-components';

interface RelatedVideoCardProps {
    video: Video;
}

const RelatedVideoCard = ({ video }: RelatedVideoCardProps) => {

    const handleClick = () => {
        window.location.href = `/watch?v=${video.id}`;
    };

    return (
        <Container onClick={handleClick}>
            <ThumbnailWrapper>
                <Thumbnail src={video.thumbnailLocation} alt={video.videopostName} />
                <Duration>{video.runningTime}</Duration>
            </ThumbnailWrapper>
            <InfoContainer>
                <Title>{video.videopostName}</Title>
                <MetaInfo>
                    <ChannelName>{video.channelTitle}</ChannelName>
                    <Stats>
                        조회수 {formatVideoCount(video.views)} • {formatDate(video.createAt)}
                    </Stats>
                </MetaInfo>
            </InfoContainer>
            <MoreButtonWrapper>
                <VideoDropdown videoId={video.id} handleClose={function (): void {
                    throw new Error('Function not implemented.');
                } } />
            </MoreButtonWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 12px;
    padding: 8px;
    cursor: pointer;

    &:hover {
        background: #f2f2f2;
        border-radius: 12px;
    }
`;

const ThumbnailWrapper = styled.div`
    position: relative;
    width: 168px;
    height: 94px;
    border-radius: 8px;
    overflow: hidden;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Duration = styled.div`
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 3px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
`;

const InfoContainer = styled.div`
    flex: 1;
    min-width: 0;
`;

const Title = styled.h3`
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 4px;
    color: #0f0f0f;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const MetaInfo = styled.div`
    font-size: 12px;
    color: #606060;
`;

const ChannelName = styled.div`
    margin-bottom: 2px;
`;

const Stats = styled.div`
    display: flex;
    gap: 4px;
`;

const MoreButtonWrapper = styled.div`
    position: relative;
`;

export default RelatedVideoCard; 