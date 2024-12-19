import { useRef, useCallback } from "react";
import { Video } from "@@types/video.type";
import VideoCard from "../components/mainPage/videoCard/VideoCard";
import CategoryList from "@components/mainPage/category/CategoryList";
import styled from "styled-components";
import { useVideos } from "@hooks/useVideos";
import { useLayoutStore } from "@stores/layoutStore";

const MainPage = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos();
    const { isDesktopSidebarOpen } = useLayoutStore();

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
        <MainPageContainer $isSidebarOpen={isDesktopSidebarOpen}>
            <CategoryList />
            <ScrollContainer>
                <VideoGrid>
                    {data?.pages.map((page) => page.data?.map((video: Video) => (
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

const MainPageContainer = styled.div<{ $isSidebarOpen: boolean }>`
    position: fixed;
    top: 56px;
    left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '240px' : '72px')};
    right: 0;
    bottom: 0;
    z-index: 1;
    transition: left 0.2s;
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
    gap: 16px;  
    width: 100%; 
    max-width: 2200px;  
    margin: 0 auto;
    padding: 16px 24px;
    
    @media (min-width: 2200px) {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    
    @media (min-width: 2000px) and (max-width: 2199px) {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    
    @media (min-width: 1600px) and (max-width: 1999px) {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    
    @media (min-width: 1200px) and (max-width: 1599px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    
    @media (min-width: 800px) and (max-width: 1199px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
    @media (min-width: 500px) and (max-width: 799px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    @media (max-width: 499px) {
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