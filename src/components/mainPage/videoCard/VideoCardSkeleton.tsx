import styled from 'styled-components';

interface Props {
    size?: 'small' | 'medium' | 'large';
}

const VideoCardSkeleton = ({ size = 'medium' }: Props) => {
    return (
        <Container size={size}>
            <ThumbnailSkeleton />
            <InfoSkeleton>
                <TitleSkeleton />
                <ChannelSkeleton />
                <StatsSkeleton />
            </InfoSkeleton>
        </Container>
    );
};

const Container = styled.div<{ size: string }>`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Skeleton = styled.div`
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;

    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;

const ThumbnailSkeleton = styled(Skeleton)`
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 12px;
`;

const InfoSkeleton = styled.div`
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const TitleSkeleton = styled(Skeleton)`
    height: 20px;
    width: 90%;
`;

const ChannelSkeleton = styled(Skeleton)`
    height: 16px;
    width: 60%;
`;

const StatsSkeleton = styled(Skeleton)`
    height: 16px;
    width: 40%;
`;

export default VideoCardSkeleton;