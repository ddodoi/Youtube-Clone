import { useVideoStore } from "@stores/videoStore";
import { styled } from "styled-components";

const VideoCard = () => {
    const { videoURL, videoFile } = useVideoStore();

    if (!videoFile) {
        return <div>업로드 중...</div>;
    }

    return (
        <VideoCardStyle>
            <video width={304} height={171} controls>
                <source src={videoURL} type={videoFile.type} />
            </video>
            <div>
                <div>파일 이름</div>
                <div>{videoFile.name}</div>
            </div>
        </VideoCardStyle>
    );
};

const VideoCardStyle = styled.div``;

export default VideoCard;
