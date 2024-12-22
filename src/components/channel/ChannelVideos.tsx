import VideoGrid from "@components/mainPage/videoGrid/VideoGrid";
import { useVideos } from "@hooks/useVideos";
import { styled } from "styled-components";
import { LoadingText, LoadingWrapper } from "../../pages/MainPage";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";

const ChannelVideos = () => {
    const { videos, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useVideos();

    const moreRef = useIntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            hasNextPage && fetchNextPage();
        }
    });

    if (isLoading) {
        return <div>동영상 불러오는 중...</div>;
    }
    return (
        <ChannelVideosStyle>
            <VideoGrid videos={videos}></VideoGrid>
            <div ref={moreRef}>
                <button onClick={() => fetchNextPage()}>
                    {hasNextPage ? "더보기" : "마지막 페이지 입니다."}
                </button>
            </div>
        </ChannelVideosStyle>
    );
};

const ChannelVideosStyle = styled.div``;

export default ChannelVideos;
