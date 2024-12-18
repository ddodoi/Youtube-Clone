import VideoCard from '../VIdeoCard/VIdeoCard';
import { Video } from '../../../types/mainPage.types';
import { MainPageContainer, VideoGrid } from '../../../style/videoCard.styles';

const MainPage = () => {
    const sampleVideos: Video[] = Array(12).fill(null).map((_, index) => ({
        id: String(index),
        title: `${index + 1}번째 추천 동영상 제목이 여기에 들어갑니다`,
        channel: `채널 ${index + 1}`,
        thumbnailUrl: `/api/placeholder/320/180?text=Video ${index + 1}`,
        viewCount: Math.floor(Math.random() * 1000000) + 100000,
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        duration: '12:34'
    }));

    return (
        <MainPageContainer>
            <VideoGrid>
                {sampleVideos.map((video: Video) => (
                    <VideoCard 
                        key={video.id}
                        video={video}
                        size="medium"
                    />
                ))}
            </VideoGrid>
        </MainPageContainer>
    );
};

export default MainPage;