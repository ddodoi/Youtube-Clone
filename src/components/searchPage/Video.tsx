import React from "react";
import styled from "styled-components";
import { VideoPreview } from "@@types/searchResult.type";
import { formatVideoCount, formatDate } from "../../utils/format";

const Video: React.FC<VideoPreview> = ({ video }) => {
    return (
        <VideoContainer>
            <Thumbnail src={video.thumbnailLocation} alt={video.videopostName} />
            <Details>
                <Title>{video.videopostName}</Title>
                <ViewCount>조회수 {formatVideoCount(video.views)}</ViewCount>
                <UploadAt>{formatDate(video.createAt)}</UploadAt>
                <Channel>{video.name}</Channel>
                <Description>{video.description}</Description>
            </Details>
        </VideoContainer>
    );
};

const VideoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    min-width: 428px;
`;

const Thumbnail = styled.img`
    width: 38%;
    background-color: transparent;
    object-fit: cover;
    visibility: inherit;
    display: inline-block;
    min-height: 80px;
    min-width: 200px;
    border-radius: 10px;
    margin-right: 1.5rem;
    aspect-ratio: 16/9;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Roboto", "Arial", sans-serif;
    line-height: 2.6rem;
    font-weight: 400;
`;

const Title = styled.div`
    color: #0f0f0f;
    font-size: 1.8rem;
    margin: 0;
`;

const ViewCount = styled.span`
    color: #606060;
    font-size: 1.2rem;
    display: inline-block;
`;

const UploadAt = styled.span`
    color: #606060;
    font-size: 1.2rem;
`;

const Description = styled.span`
    color: #606060;
    font-size: 1.2rem;
    margin: 5px 0;
`;

const Channel = styled.span`
    color: #606060;
    font-size: 1.2rem;
`;

export default Video;
