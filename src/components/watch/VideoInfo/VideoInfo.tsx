import { useState } from "react";
import { Video } from "@@types/video.type";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { LuDownload } from "react-icons/lu";
import {
    InfoContainer,
    Title,
    MetaSection,
    ChannelInfo,
    ChannelAvatar,
    ChannelMeta,
    ChannelName,
    SubscriberCount,
    SubscribeButton,
    ActionButtons,
    Divider,
    Description,
    ViewCount,
} from "./styles";
import { formatNumber } from "../../../utils/format";
import styled from "styled-components";

interface VideoInfoProps {
    video: Video;
}

const VideoInfo = ({ video }: VideoInfoProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(video.likes || 0);

    const handleLike = () => {
        if (isLiked) {
            setLikeCount((prev: number) => prev - 1);
            setIsLiked(false);
        } else {
            setLikeCount((prev: number) => prev + (isDisliked ? 1 : 1));
            setIsLiked(true);
            setIsDisliked(false);
        }
    };

    const handleDislike = () => {
        if (isDisliked) {
            setIsDisliked(false);
        } else {
            if (isLiked) {
                setLikeCount((prev: number) => prev - 1);
            }
            setIsDisliked(true);
            setIsLiked(false);
        }
    };

    return (
        <InfoContainer>
            <Title>{video.videopostName}</Title>
            <MetaSection>
                <ChannelInfo>
                    <ChannelAvatar $src={video.channelThumbnailURL} />
                    <ChannelMeta>
                        <ChannelName>{video.channelTitle}</ChannelName>
                        <SubscriberCount>구독자 123만명</SubscriberCount>
                    </ChannelMeta>
                    <SubscribeButton>구독</SubscribeButton>
                </ChannelInfo>
                <ActionButtons>
                    <ButtonGroup>
                        <ActionButton onClick={handleLike} $isLiked={isLiked}>
                            {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                            <span>{formatNumber(likeCount)}</span>
                        </ActionButton>
                        <Divider />
                        <ActionButton onClick={handleDislike} $isDisliked={isDisliked}>
                            {isDisliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                        </ActionButton>
                    </ButtonGroup>
                    <ActionButton>
                        <PiShareFat size={20} />
                        <span>공유</span>
                    </ActionButton>
                    <ActionButton>
                        <LuDownload size={20} />
                        <span>오프라인 저장</span>
                    </ActionButton>
                    <ActionButton>

                    </ActionButton>
                </ActionButtons>
            </MetaSection>
            <Description>
                <ViewCount>조회수 {formatNumber(video.views)}회</ViewCount>
            </Description>
        </InfoContainer>
    );
};

const ActionButton = styled.button<{ $isLiked?: boolean; $isDisliked?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: none;
    border-radius: 18px;
    background: ${({ theme }) => theme?.colors?.button?.background || '#f2f2f2'};
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || '#e5e5e5'};
    }

    svg {
        color: ${({ theme }) => theme?.colors?.text?.secondary || '#606060'};
        ${(props) => (props.$isLiked || props.$isDisliked) &&
            `
            color: #065fd4;
        `}
    }

    span {
        color: ${({ theme }) => theme?.colors?.text?.primary || '#0f0f0f'};
        ${(props) => (props.$isLiked || props.$isDisliked) &&
            `
            color: #065fd4;
        `}
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme?.colors?.button?.background || '#f2f2f2'};
    border-radius: 18px;
    overflow: hidden;
`;

export default VideoInfo;
