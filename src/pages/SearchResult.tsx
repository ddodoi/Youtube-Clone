import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import Video from "@components/searchPage/Video";
import CategoryList from "@components/mainPage/category/CategoryList";
import { useLayoutStore } from "@stores/layoutStore";
import { useVideos } from "@hooks/useVideos";
import VideoCard from "@components/mainPage/videoCard/VideoCard";

const SearchResult: React.FC = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 타임아웃 참조
    const { videos, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos();
    const { isDesktopSidebarOpen } = useLayoutStore();

    const lastVideoRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || isFetchingNextPage) return;

            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = setTimeout(() => {
                        fetchNextPage();
                    }, 100);
                }
            });

            if (node) {
                observerRef.current.observe(node);
            }
        },
        [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
    );

    return (
        <SearchResultContainer $isSidebarOpen={isDesktopSidebarOpen}>
            <CategoryList />
            <ScrollContainer>
                <VideoGrid>
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <div key={`skeleton-${index}`}>
                                  <VideoCard isLoading />
                              </div>
                          ))
                        : videos.map((video, i) => (
                              <div
                                  key={video.videopostId}
                                  ref={i === videos.length - 1 ? lastVideoRef : null}
                              >
                                  <Video key={i} video={video} />
                              </div>
                          ))}
                </VideoGrid>
                {isFetchingNextPage && <Loader>Loading...</Loader>}
            </ScrollContainer>
        </SearchResultContainer>
    );
};

const SearchResultContainer = styled.div<{ $isSidebarOpen: boolean }>`
    position: fixed;
    top: 56px; /* 헤더 높이 */
    left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "240px" : "72px")};
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const VideoGrid = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    max-width: 1920px;
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 24px;
    box-sizing: border-box;

    /* 스크롤바 스타일 */
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

const Loader = styled.div`
    text-align: center;
    padding: 16px;
    font-size: 16px;
    color: #666;
`;

export default SearchResult;
