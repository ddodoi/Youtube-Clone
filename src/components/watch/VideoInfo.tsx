import styled from "styled-components";
import { Video } from "../../types/video.type";
import { formatNumber, formatDate } from "../../utils/format";

interface VideoInfoProps {
    video: Video;
}

const VideoInfo = ({ video }: VideoInfoProps) => {
    const Container = styled.div`
        width: 854px;
        padding: 0;
    `;

    const Title = styled.h1`
        font-size: 20px;
        font-weight: 600;
        margin: 12px 0;
        color: #0f0f0f;
        width: 100%;
    `;

    const MetaInfo = styled.div`
        display: flex;
        align-items: center;
        gap: 4px;
        color: #606060;
        font-size: 14px;
        margin-bottom: 12px;
    `;

    const ViewCount = styled.span`
        &:after {
            content: "•";
            margin: 0 4px;
        }
    `;

    const UploadDate = styled.span``;

    const ChannelRow = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        margin: 12px 0;
        padding: 12px 0;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
    `;

    return (
        <Container>
            <Title>{video.videopostName}</Title>
            <MetaInfo>
                <ViewCount>조회수 {formatNumber(video.views)}회</ViewCount>
                <UploadDate>{formatDate(video.createAt)}</UploadDate>
            </MetaInfo>
            <ChannelRow>{/* ... 기존 채널 정보 및 버튼 ... */}</ChannelRow>
        </Container>
    );
};

export default VideoInfo;
