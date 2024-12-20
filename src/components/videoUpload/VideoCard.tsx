import { useVideoFile } from "@hooks/useVideoFile";
import { styled } from "styled-components";

const VideoCard = () => {
    const { videoURL, videoFile, thumbnailURL } = useVideoFile();

    if (!videoFile) {
        return <div>업로드 중...</div>;
    }

    return (
        <VideoCardStyle>
            <video controls poster={thumbnailURL}>
                <source src={videoURL} type={videoFile.type} />
            </video>
            <div>
                <div>파일 이름</div>
                <div>{videoFile.name}</div>
            </div>
        </VideoCardStyle>
    );
};

const VideoCardStyle = styled.div`
    padding-left: 24px;
    video {
        width: 352px;
        height: 171px;
    }
`;

export default VideoCard;
