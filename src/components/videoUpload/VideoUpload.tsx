import { styled } from "styled-components";
import { MdFileUpload } from "react-icons/md";
import FileButton from "@components/common/FileButton";
import VideoUploadContainer from "./VideoUploadContainer";
import VideoUploaded from "./VideoUploaded";
import { useVideoFile } from "@hooks/useVideoFile";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoUpload: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { videoFile, handleVideoUpload } = useVideoFile();

    return (
        <VideoUploadContainer title="동영상 업로드" isOpen={isOpen} setIsOpen={setIsOpen}>
            {videoFile ? (
                <form action="">
                    <VideoUploaded />
                </form>
            ) : (
                <VideoUploadStyle>
                    <div className="content">
                        <div className="upload-icon">
                            <MdFileUpload />
                        </div>
                        <div className="description-1">동영상 파일을 드래그 앤 드롭하여 업로드</div>
                        <div className="description-2">
                            동영상을 게시하기 전에는 비공개로 설정됩니다.
                        </div>
                        <FileButton accept="video/*" onChange={handleVideoUpload}>
                            <StyledLabel>파일 선택</StyledLabel>
                        </FileButton>
                        <div className="description-3">
                            YouTube에 동영상을 제출하면 YouTube{" "}
                            <a href="https://www.youtube.com/t/terms">서비스 약관</a> 및
                            <a href="https://www.youtube.com/howyoutubeworks/policies/community-guidelines/">
                                커뮤니티 가이드
                            </a>
                            에 동의하게 됩니다.
                        </div>
                        <div className="description-3">
                            불법촬영을 게재시 삭제 조치되고 관련 법에 따라 처벌 받을 수 있습니다.
                            타인의 저작권 또는 개인 정보 보호 권리를 침해해서는 안 됩니다.{" "}
                            <a href="https://www.youtube.com/howyoutubeworks/policies/copyright/">
                                자세히 알아보기
                            </a>
                        </div>
                    </div>
                </VideoUploadStyle>
            )}
        </VideoUploadContainer>
    );
};

const VideoUploadStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    flex: 1;

    .content {
        min-height: 370px;
        padding: 16px 50px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .upload-icon {
            margin-top: auto;
            width: 136px;
            height: 136px;
            background: #f9f9f9;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                font-size: 52px;
                color: #909090;
            }
        }

        .description-1 {
            line-height: 24px;
            margin-top: 23px;
            color: #0d0d0d;
            font-size: 15px;
        }

        .description-2 {
            font-size: 13px;
            color: rgb(96, 96, 96);
            line-height: 20px;
            margin-top: 2px;
        }

        .description-3 {
            margin-bottom: 4px;
            font-size: 12px;
            line-height: 24px;
            letter-spacing: 0.011em;
            color: #606060;

            a {
                color: #065fd4;
                text-decoration: none;
            }
        }
    }
`;

const StyledLabel = styled.label`
    display: block;
    align-content: center;
    min-width: 36px;
    height: 36px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    border: none;
    outline: none;
    background: #0d0d0d;
    color: rgb(255, 255, 255);
    border-radius: 18px;
    padding: 0 16px;
    cursor: pointer;
`;

export default VideoUpload;
