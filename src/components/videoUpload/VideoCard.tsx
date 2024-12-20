import { useVideoFile } from "@hooks/useVideoFile";
import { ForwardedRef, forwardRef } from "react";
import { styled } from "styled-components";

const VideoCard = forwardRef((_, ref: ForwardedRef<HTMLVideoElement>) => {
    const { videoURL, videoFile, thumbnailURL } = useVideoFile();

    if (!videoFile) {
        return <div>업로드 중...</div>;
    }

    return (
        <VideoCardStyle>
            <video controls poster={thumbnailURL} ref={ref}>
                <source src={videoURL} type={videoFile.type} />
            </video>
            <div>
                <div>파일 이름</div>
                <div>{videoFile.name}</div>
            </div>
        </VideoCardStyle>
    );
});

const VideoCardStyle = styled.div`
    padding-left: 24px;
    video {
        width: 352px;
        height: 171px;
    }
`;

export default VideoCard;
