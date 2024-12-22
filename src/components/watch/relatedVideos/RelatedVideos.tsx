import { useVideos } from "@hooks/useVideos";
import RelatedVideoCard from "./RelatedVideoCard";
import styled from "styled-components";
import { Video } from "../../../types/video.type";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useState, useRef, useEffect } from "react";

const RelatedVideos = () => {
    const { videos, isFetching } = useVideos();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const categories = ["모두", "맞춤 동영상", "관련 콘텐츠", "추천", "최근에 업로드된 동영상"];

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        handleScroll();
    }, []);

    if (isFetching) {
        return <div>동영상 불러오는 중...</div>;
    }

    return (
        <Container>
            <CategorySection>
                {showLeftArrow && (
                    <ArrowButton $position="left" onClick={() => scroll("left")}>
                        <MdChevronLeft size={24} />
                    </ArrowButton>
                )}
                <ScrollContainer ref={scrollRef} onScroll={handleScroll}>
                    {categories.map((category, index) => (
                        <CategoryButton key={index} $isSelected={index === 0}>
                            {category}
                        </CategoryButton>
                    ))}
                </ScrollContainer>
                {showRightArrow && (
                    <ArrowButton $position="right" onClick={() => scroll("right")}>
                        <MdChevronRight size={24} />
                    </ArrowButton>
                )}
            </CategorySection>
            <VideoList>
                {videos?.map((video: Video) => (
                    <RelatedVideoCard key={video.videopostId} video={video} />
                ))}
            </VideoList>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    padding: 30px 0;
    position: relative;
    z-index: 1;
    margin-left: -80px;
`;

const CategorySection = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 11px;
    background: white;
    padding: 0 50px;
    display: flex;
    align-items: center;
    margin-left: 0;
`;

const ScrollContainer = styled.div`
    flex: 1;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    display: flex;
    gap: 8px;
    padding: 8px 40px;
    position: relative;
    margin-left: 0;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ArrowButton = styled.button<{ $position: "left" | "right" }>`
    position: absolute;
    ${(props) => (props.$position === "left" ? "left: 0;" : "right: 0;")};
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background: #f2f2f2;
    }
`;

const CategoryButton = styled.button<{ $isSelected: boolean }>`
    padding: 8px 8px;
    border: none;
    border-radius: 8px;
    background: ${(props) => (props.$isSelected ? "#0f0f0f" : "#f2f2f2")};
    color: ${(props) => (props.$isSelected ? "white" : "#0f0f0f")};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        background: ${(props) => (props.$isSelected ? "#0f0f0f" : "#e5e5e5")};
    }
`;

const VideoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 24px;
`;

export default RelatedVideos;
