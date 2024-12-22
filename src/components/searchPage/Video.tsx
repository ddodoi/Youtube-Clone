import React from "react";
import styled from "styled-components";
import { VideoPreview } from "@@types/searchResult.type";
import { formatVideoCount, formatDate } from "../../utils/format";

interface Props{
    video : VideoPreview;
}
const Video: React.FC<Props> = ({ video }) => { 
    return (
        <VideoContainer>
            <Thumbnail src={video.thumbnailLocation} alt={video.videopostName} />
            <Details>
                <Title>{video.videopostName}</Title>
                <ViewUploadAtBox>
                    <ViewCount>조회수 {formatVideoCount(video.views)} ·</ViewCount>
                    <UploadAt>  {formatDate(video.createAt)}</UploadAt>
                </ViewUploadAtBox>
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
    margin: 10px 0;
    border-radius: 12px;
    width: 100%;
    flex-wrap: nowrap;
    gap: 16px;
    max-height: 300px;

`;

const Thumbnail = styled.img`
    width: 42%; 
    min-width: 250px;
    background-color: transparent;
    object-fit: cover;
    border-radius: 12px;
    aspect-ratio: 16 / 9;
`;

const Details = styled.div`
    flex: 1; /* 텍스트 영역이 썸네일 옆에서 유연하게 확장 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Roboto", "Arial", sans-serif;
    line-height: 1.8rem;
    max-height: 200px;
    min-width: 200px;
`;



const Title = styled.div`
    color: #0f0f0f;
    font-size: 1.8rem;
    margin: 0;
    overflow: hidden;
    margin-bottom : 10px
`;

const ViewUploadAtBox = styled.div`
    margin-bottom : 10px

`

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
    overflow: hidden;
`;

const Channel = styled.span`
    color: #606060;
    font-size: 1.2rem;
    margin-bottom : 10px
`;

export default Video;
