import { styled } from "styled-components";
import VideoCard from "./VideoCard";
import FileButton from "@components/common/FileButton";
import InputText from "@components/common/InputText";
import { useVideoFile } from "@hooks/useVideoFile";

const VideoUploaded = () => {
    const { videoTitle } = useVideoFile();

    return (
        <VideoUploadedStyle>
            <h1>세부정보</h1>
            <div className="video-body">
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
                            <FileButton accept="image/*">
                                <LabelStyle>파일 업로드</LabelStyle>
                            </FileButton>
                        </div>
                    </div>
                </div>
                <VideoCard />
            </div>
        </VideoUploadedStyle>
    );
};

const VideoUploadedStyle = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        margin: 8px 48px 17px 48px;
        font-size: 25px;
        line-height: 32px;
        font-weight: 600;
    }

    .video-body {
        display: flex;
        padding: 0 48px 24px;

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

            .image-upload-button {
            }
        }
    }
`;

const LabelStyle = styled.label``;

export default VideoUploaded;
