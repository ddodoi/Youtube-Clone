// import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import { Video } from "../../types/video";
import VideoCard from "../mainPage/videoCard/VideoCard";
import styled from "styled-components";
import { useVideos } from "../../hooks/useVideos";

const MainPage = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos();

    const observerRef = useRef<IntersectionObserver>();
    const loadingRef = useRef<HTMLDivElement>(null);

    // 무한 스크롤을 위한 intersection observer 설정
    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || isFetchingNextPage) return;

            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (node) {
                observerRef.current.observe(node);
            }
        },
        [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
    );

    return (
        <MainPageContainer>
            <ScrollContainer>
                <VideoGrid>
                    {data?.pages.map((page) =>
                        page.data?.map((video: Video) => (
                            <VideoCard key={video.id} video={video} size="medium" />
                        )),
                    )}
                </VideoGrid>
                {/* 무한 스크롤 로딩 트리거 */}
                <LoadingTrigger ref={loadingRef}>
                    <div ref={lastElementRef} />
                    {isFetchingNextPage && <LoadingText>동영상을 불러오는 중...</LoadingText>}
                </LoadingTrigger>
            </ScrollContainer>
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: fixed;
    top: 56px; /* 헤더 높이 */
    left: 72px; /* 사이드바 너비 */
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 24px;
    box-sizing: border-box;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #909090;
        border-radius: 4px;
    }
`;

const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    width: 100%;

    @media (min-width: 1850px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: 1500px) and (max-width: 1849px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: 1000px) and (max-width: 1499px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 600px) and (max-width: 999px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 599px) {
        grid-template-columns: 1fr;
    }
`;

const LoadingTrigger = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const LoadingText = styled.div`
    color: #606060;
    font-size: 14px;
`;

export default MainPage;
