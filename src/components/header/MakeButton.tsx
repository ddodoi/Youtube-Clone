import { styled } from "styled-components";
import { Link } from "react-router-dom";
import VideoUpload from "@components/videoUpload/VideoUpload";
import { ReactComponent as VideoUploadIcon } from "@assets/header/videoUpload.svg";
import { BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import Dropdown from "@components/common/Dropdown";

const MakeButton = () => {
    const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
    const [isMakeVideoOpen, setIsMakeVideoOpen] = useState(false);

    const handleMakeVideo = () => {
        setIsMakeVideoOpen(true);
        setIsMakeDropdownOpen(false);
    };
    return (
        <MakeButtonStyle>
            <Dropdown
                isOpen={isMakeDropdownOpen}
                setIsOpen={setIsMakeDropdownOpen}
                toggleButton={
                    <>
                        <BsPlusLg size={24} />
                        <MakeText>만들기</MakeText>
                    </>
                }
            >
                <MakeButtonPanel>
                    <div onClick={handleMakeVideo}>
                        <VideoUploadIcon />
                        <Link to={""} aria-label={"동영상 만들기"}>
                            {"동영상 만들기"}
                        </Link>
                    </div>
                </MakeButtonPanel>
            </Dropdown>
            <VideoUpload isOpen={isMakeVideoOpen} setIsOpen={setIsMakeVideoOpen} />
        </MakeButtonStyle>
    );
};

const MakeButtonStyle = styled.div`
    margin-right: 8px;

    button {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        border-radius: 18px;
        border: none;
        outline: none;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        svg {
            margin: 0 6px 0 -6px;
        }
    }
`;

const MakeButtonPanel = styled.div`
    position: absolute;
    padding: 8px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    div {
        padding: 0 36px 0 16px;
        display: flex;
        align-items: center;
        height: 40px;
        width: 200px;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        svg {
            margin-right: 16px;
        }

        a {
            text-decoration: none;
            color: rgb(15, 15, 15);
            font-size: 1.4rem;
            line-height: 2rem;
        }
    }
`;

const MakeText = styled.div`
    white-space: nowrap;
`;

export default MakeButton;
