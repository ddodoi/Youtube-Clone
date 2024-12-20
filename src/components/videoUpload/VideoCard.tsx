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
            <div className="file-info">
                <div className="label">파일 이름</div>
                <div className="name">{videoFile.name}</div>
            </div>
        </VideoCardStyle>
    );
});

const VideoCardStyle = styled.div`
    margin-left: 24px;
    height: fit-content;
    border-radius: 8px;
    background: rgb(243, 243, 243);

    video {
        width: 352px;
        height: 171px;
    }

    .file-info {
        .label {
            margin-top: 12px;
            padding: 0 16px;
            font-size: 12px;
            color: #606060;
        }
        .name {
            margin: 0 16px;
            padding-bottom: 5px;
            color: #0d0d0d;
            font-size: 15px;
        }
    }
`;

export default VideoCard;
