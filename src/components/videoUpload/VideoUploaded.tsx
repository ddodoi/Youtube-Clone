import { styled } from "styled-components";
import VideoCard from "./VideoCard";
import FileButton from "@components/common/FileButton";
import InputText from "@components/common/InputText";
import { useVideoFile } from "@hooks/useVideoFile";
import { ReactComponent as ThumbnailUploadIcon } from "@assets/videoUpload/thumbnailUpload.svg";

const VideoUploaded = () => {
    const { videoTitle, handleThumbnailUpload, thumbnailURL } = useVideoFile();

    return (
        <VideoUploadedStyle>
            <h1>세부정보</h1>
            <VideoUploadedBody>
                <div className="video-info">
                    <InputText label="제목(필수 항목)" content={videoTitle}></InputText>
                    <InputText
                        label="설명"
                        placeholder="시청자에게 동영상에 대해 설명해주세요(채널을 멘션하려면 @ 입력)"
                        style={{ minHeight: 109 }}
                    ></InputText>
                    <div className="thumbnail">
                        <div className="label">썸네일</div>
                        <div className="sub-label">
                            눈에 띄고 시청자의 관심을 끄는 썸네일을 설정하세요.{" "}
                            <a href="https://support.google.com/youtube/answer/72431?hl=ko">
                                자세히 알아보기
                            </a>
                        </div>
                        <div className="image-upload-button">
                            <FileButton accept="image/*" onChange={handleThumbnailUpload}>
                                <LabelStyle>
                                    {thumbnailURL && <img src={thumbnailURL} />}
                                    {!thumbnailURL && (
                                        <>
                                            <div className="upload-icon">
                                                <ThumbnailUploadIcon />
                                            </div>
                                            <span className="upload-label">파일 업로드</span>
                                        </>
                                    )}
                                </LabelStyle>
                            </FileButton>
                        </div>
                    </div>
                </div>
                <VideoCard />
            </VideoUploadedBody>
            <VideoUploadedFooter>
                <div></div>
                <button>다음</button>
            </VideoUploadedFooter>
        </VideoUploadedStyle>
    );
};

const VideoUploadedStyle = styled.form`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    height: 100%;

    h1 {
        margin: 8px 48px 17px 48px;
        font-size: 25px;
        line-height: 32px;
        font-weight: 600;
    }
`;

const VideoUploadedBody = styled.div`
    display: flex;
    padding: 0 48px 24px;
    flex-grow: 1;

    .video-info {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 24px;
    }

    .thumbnail {
        display: flex;
        flex-direction: column;

        .label {
            font-size: 15px;
            font-weight: 500;
            line-height: 24px;
        }

        .sub-label {
            font-size: 13px;
            line-height: 20px;
            color: #606060;

            a {
                text-decoration: none;
                color: #065fd4;
            }
        }
    }
`;

const LabelStyle = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 153px;
    height: 84px;
    border: 1px dashed rgb(204, 204, 204);
    padding: 1px;

    cursor: pointer;
    &:hover {
        border: 1px dashed rgb(94, 94, 94);
    }

    .upload-icon {
        height: 24px;
        margin: 4px;
    }

    .upload-label {
        color: rgb(96, 96, 96);
        font-size: 12px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const VideoUploadedFooter = styled.div`
    display: flex;
    padding: 16px 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    div {
        flex-grow: 1;
    }

    button {
        min-width: 36px;
        height: 36px;
        margin-left: 8px;
        font-size: 14px;
        font-weight: 500;
        line-height: 36px;
        border-radius: 18px;
        color: rgb(255, 255, 255);
        background-color: rgb(3, 3, 3);
        padding: 0 16px;
        cursor: pointer;

        &:hover {
            background-color: rgb(30, 30, 30);
        }
    }
`;

export default VideoUploaded;
