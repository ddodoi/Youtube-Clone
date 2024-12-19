import Modal from "@components/common/Modal";
import { ReactComponent as Report } from "@assets/header/report.svg";
import { ReactComponent as Close } from "@assets/header/close.svg";
import { styled } from "styled-components";
import { useVideoFile } from "@hooks/useVideoFile";

interface Props {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoUploadContainer: React.FC<Props> = ({ title, children, isOpen, setIsOpen }) => {
    const { setVideoFile } = useVideoFile();
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={() => {
                setIsOpen(false);
                setVideoFile(null);
            }}
            {...modalBodyStyle}
        >
            <VideoUploadContainerStyle>
                <div className="header">
                    <div className="left">{title}</div>
                    <div className="right">
                        <button>
                            <Report />
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setVideoFile(null);
                            }}
                        >
                            <Close />
                        </button>
                    </div>
                </div>
                {children}
            </VideoUploadContainerStyle>
        </Modal>
    );
};

const VideoUploadContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        height: 52px;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .left {
            margin-right: 16px;
            font-size: 20px;
            line-height: 28px;
            font-weight: 500;
            color: #212121;
        }

        .right {
            margin-left: auto;

            button {
                border: none;
                background: none;
                outline: none;
                padding: 6px;
                border-radius: 50%;
                cursor: pointer;

                &:hover {
                    background: rgba(0, 0, 0, 0.06);
                }
            }
        }
    }
`;

const modalBodyStyle: React.CSSProperties = {
    width: 960,
    minWidth: 960,
    minHeight: 492,
    boxShadow:
        "0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12), 0 11px 15px -7px rgba(0, 0, 0, .4)",
    borderRadius: 24,
    height: "calc(100% - 48px * 2)",
};

export default VideoUploadContainer;
