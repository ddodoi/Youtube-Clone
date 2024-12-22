import React, {useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Video from "@components/searchPage/Video";
import { VideoPreview } from "@@types/searchResult.type";
import CategoryList from "@components/mainPage/category/CategoryList";
import { useLayoutStore } from "@stores/layoutStore";
import { useVideos } from "@hooks/useVideos";
import VideoCard from "@components/mainPage/videoCard/VideoCard";

const SearchResult: React.FC = () => {
    const { isDesktopSidebarOpen } = useLayoutStore();
    const [searchParams] = useSearchParams();
    const fetchSearchQuery = searchParams.get("search_query") || ""; // 검색어 가져오기
    const [loading] = useState(false); // 로딩 상태
    const [hasMore] = useState(true); // 추가 데이터 유무
    const loaderRef = useRef<HTMLDivElement | null>(null); // 로더 참조
    const observerRef = useRef<IntersectionObserver | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 타임아웃 참조
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos();

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
                }}
            );

            if (node) {
                observerRef.current.observe(node);
            }
        },
        [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
    );
              
    const allVideos =
        data?.pages.reduce<VideoPreview[]>((acc, page) => {
            if (page.success && page.data) {
                return [...acc, ...page.data];
            }
            return acc;
        }, []) || [];
        
    return (
        <SearchResultContainer $isSidebarOpen={isDesktopSidebarOpen}>
            <CategoryList />
            <ScrollContainer>
                <VideoGrid>
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, index) => (
                            <div key={`skeleton-${index}`}>
                                <VideoCard isLoading/>
                            </div>
                        ))
                        : allVideos.map((video, i) => (
                            <div
                                key={video.videopostId}
                                ref={i === allVideos.length - 1 ? lastVideoRef : null}
                            >
                                <Video key={i} video={video} />
                            </div>
                    ))}
                </VideoGrid>
                {loading && <Loader>Loading...</Loader>}
                {hasMore && <div ref={loaderRef} style={{ height: "1px" }} />} {/* 로더 */}
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
