import VideoGrid from "@components/mainPage/videoGrid/VideoGrid";
import { useVideos } from "@hooks/useVideos";
import { styled } from "styled-components";
import SVG from "@components/common/SVG";
import { ReactComponent as ArrowDown } from "@assets/sidebar/arrowDown.svg";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import Loading from "@components/common/Loading";

const ChannelVideos = () => {
    const { videos, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useVideos();

    const moreRef = useIntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                hasNextPage && fetchNextPage();
            }
        },
        { rootMargin: "100px" },
    );

    if (isLoading) {
        return <div>동영상 불러오는 중...</div>;
    }

    return (
        <ChannelVideosStyle>
            <VideoGrid videos={videos} />
            <MoreButton ref={moreRef}>
                {isFetchingNextPage ? (
                    <Loading />
                ) : (
                    <button onClick={() => fetchNextPage()}>
                        {hasNextPage ? (
                            <SVG size={50} color="#555">
                                <ArrowDown />
                            </SVG>
                        ) : (
                            "마지막 페이지 입니다."
                        )}
                    </button>
                )}
            </MoreButton>
        </ChannelVideosStyle>
    );
};

const ChannelVideosStyle = styled.div`
    width: 100%;
`;

const MoreButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;

    button {
        border: none;
        background: none;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default ChannelVideos;
