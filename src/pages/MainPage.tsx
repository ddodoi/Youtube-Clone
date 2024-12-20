import { useRef, useCallback } from "react";
import { Video } from "@@types/video.type";
import VideoCard from "@components/mainPage/videoCard/VideoCard";
import CategoryList from "@components/mainPage/category/CategoryList";
import styled from "styled-components";
import { useVideos } from "@hooks/useVideos";
import { useLayoutStore } from "@stores/layoutStore";

const MainPage = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos();
    const { isDesktopSidebarOpen } = useLayoutStore();
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastVideoRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || isFetchingNextPage) return;

            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                        console.log("Fetching next page...");
                        fetchNextPage();
                    }
                },
                {
                    rootMargin: "200px", // 하단부 200px 여유를 둠
                }
            );

            if (node) {
                observerRef.current.observe(node);
            }
        },
        [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
    );

    // Restrict loading to 10 videos per page
    const allVideos = data?.pages.reduce<Video[]>((acc, page) => {
        if (page.success && page.data) {
            return [...acc, ...page.data.slice(0, 10)]; // Limit to 10 videos per page
        }
        return acc;
    }, []) || [];

    return (
        <MainPageContainer $isSidebarOpen={isDesktopSidebarOpen}>
            <CategoryList />
            <ScrollContainer>
                <VideoGrid>
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <div key={`skeleton-${index}`}>
                                  <VideoCard isLoading size="medium" />
                              </div>
                          ))
                        : allVideos.map((video, index) => (
                              <div
                                  key={video.id}
                                  ref={index === allVideos.length - 1 ? lastVideoRef : null}
                              >
                                  <VideoCard video={video} size="medium" />
                              </div>
                          ))}
                </VideoGrid>
                {isFetchingNextPage && (
                    <LoadingWrapper>
                        <LoadingText>Loading</LoadingText>
                    </LoadingWrapper>
                )}
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
    @media screen and (${({theme})=>theme.mediaQuery.sidebar.tablet}) {
         left: 72px;
    }
    @media screen and (${({theme})=>theme.mediaQuery.sidebar.mobile}) {
         left: 0px;
    }
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
    padding: 24px;
    box-sizing: border-box;

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
    max-width: 2200px;
    margin: 0 auto;

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

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
`;

const LoadingText = styled.div`
    color: #606060;
    font-size: 14px;
    text-align: center;
`;

export default MainPage;
