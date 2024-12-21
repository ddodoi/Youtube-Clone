import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Video from "@components/searchPage/Video";
import { VideoPreview } from "@@types/searchResult.type";
import CategoryList from "@components/mainPage/category/CategoryList";
import { useLayoutStore } from "@stores/layoutStore";

const SearchResult: React.FC = () => {
    const { isDesktopSidebarOpen } = useLayoutStore();
    const [searchParams] = useSearchParams();
    const fetchSearchQuery = searchParams.get("search_query") || ""; // 검색어 가져오기
    const [videos, setVideos] = useState<VideoPreview[]>([]); // 동영상 데이터 상태
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 추가 데이터 유무
    const loaderRef = useRef<HTMLDivElement | null>(null); // 로더 참조

    // 데이터를 가져오는 함수
    const fetchVideos = useCallback(async () => {
        if (loading || !hasMore) return; // 이미 로딩 중이거나 데이터가 없으면 종료

        setLoading(true);
        try {
            const response = await fetch(`/videos?page=${page}&limit=10`); // 한 번에 10개 로드
            const data = await response.json();

            if (data.data.length > 0) {
                setVideos((prevVideos) => [...prevVideos, ...data.data]); // 기존 데이터와 병합
                if (data.data.length < 10) setHasMore(false); // 10개 미만 데이터면 더 이상 로드하지 않음
            } else {
                setHasMore(false); // 데이터가 없으면 로드 중단
            }
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && hasMore && !loading) {
                    setPage((prevPage) => prevPage + 1); // 다음 페이지 요청
                }
            },
            { root: null, rootMargin: "0px", threshold: 1.0 } // 100% 화면에 나타나야 트리거
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore, loading]);

    // 페이지 변경 시 데이터를 가져옴
    useEffect(() => {
        fetchVideos();
    }, [page, fetchVideos]);

    return (
        <SearchResultContainer $isSidebarOpen={isDesktopSidebarOpen}>
            <CategoryList />
            <ScrollContainer>
                <VideoGrid>
                    {videos.map((video) => (
                        <Video key={video} video={video} />
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
