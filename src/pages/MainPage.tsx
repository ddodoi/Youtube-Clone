import { useRef, useCallback } from "react";
import { Video } from "@@types/video.type";
import VideoCard from "../components/mainPage/videoCard/VideoCard";
import CategoryList from "@components/mainPage/category/CategoryList";
import styled from "styled-components";
import { useVideos } from "@hooks/useVideos";

const MainPage = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos();
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastVideoRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return;

            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            });

            if (node) {
                observerRef.current.observe(node);
            }
        },
        [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    if (isLoading) {
        return <LoadingText>동영상을 불러오는 중...</LoadingText>;
    }

    const allVideos = data?.pages.reduce<Video[]>((acc, page) => {
        if (page.success && page.data) {
            return [...acc, ...page.data];
        }
        return acc;
    }, []) || [];

    return (
        <MainPageContainer>
            <CategoryList />
            <ScrollContainer>
                <VideoGrid>
                    {allVideos.map((video, index) => (
                        <div
                            key={video.id}
                            ref={index === allVideos.length - 1 ? lastVideoRef : null}
                        >
                            <VideoCard video={video} size="medium" />
                        </div>
                    ))}
                </VideoGrid>
                {isFetchingNextPage && <LoadingText>동영상을 불러오는 중...</LoadingText>}
            </ScrollContainer>
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: fixed;
    top: 50px;
    left: 72px;
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

const LoadingText = styled.div`
    color: #606060;
    font-size: 14px;
    text-align: center;
    padding: 20px;
`;

export default MainPage;