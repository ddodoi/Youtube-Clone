import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import VideoPlayer from "@components/watch/videoPlayer/VideoPlayer";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { LuDownload } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import Comments from "@components/watch/comments/Comments";
import RelatedVideos from "@components/watch/relatedVideos/RelatedVideos";
import { useVideo } from "@hooks/useVideo";
import { fakerKO as faker } from "@faker-js/faker";
import { useChannel } from "@hooks/useChannel";
import { formatNumber, formatNumberComma } from "../utils/format";

const WatchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const videoId = Number(searchParams.get("v")) || null;
    if (!videoId) {
        window.alert("잘못된 경로로 접근하셨습니다.");
        navigate("/"); // 리다이렉팅
        return;
    }
    const { video } = useVideo({ videoId });
    const { channel } = useChannel({ channelId: video?.channelId });

    if (!video) return <div>로딩중...</div>;

    return (
        <PageContainer>
            <MainContent>
                <VideoSection>
                    <VideoPlayer videoUrl={video.videoLocation} />
                    <InfoSection>
                        <Title>{video.videopostName}</Title>
                        <MetaSection>
                            <ChannelInfo>
                                <ChannelAvatar src={channel.profileLocation} />
                                <ChannelMeta>
                                    <ChannelName>{channel.name}</ChannelName>
                                    <SubscriberCount>
                                        {formatNumber(channel.subscribers)}명
                                    </SubscriberCount>
                                </ChannelMeta>
                                <SubscribeButton>구독</SubscribeButton>
                            </ChannelInfo>
                            <ActionButtons>
                                <ButtonGroup>
                                    <ActionButton>
                                        <AiOutlineLike size={20} />
                                        {/* 동영상 좋아요 수 */}
                                        <span>2.3만</span>
                                    </ActionButton>
                                    <Divider />
                                    <ActionButton>
                                        <AiOutlineDislike size={20} />
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
                                    <BsThreeDots size={20} />
                                </ActionButton>
                            </ActionButtons>
                        </MetaSection>
                        <DescriptionCard>
                            <ViewCount>조회수 {formatNumberComma(video.views)}회</ViewCount>
                            {/* 영상 설명 */}
                            <Description>{faker.lorem.paragraph()}</Description>
                        </DescriptionCard>
                    </InfoSection>
                </VideoSection>
                <Comments />
            </MainContent>
            <SecondaryContent>
                <RelatedVideos />
            </SecondaryContent>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    max-width: 1700px;
    padding-top: 24px;
    width: 100%;
    justify-content: center;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
`;

const VideoSection = styled.div`
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoSection = styled.div`
    width: 100%;
    @media (max-width: 1200px) {
        max-width: 800px;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    margin: 12px;
    color: #0f0f0f;
`;

const MetaSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    padding: 4px 0;
    margin-top: 10px;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
`;

const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    flex: 1;
    padding-right: 96px;
`;

const ChannelAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e5e5e5;
    margin-right: 10px;
    margin-top: -10px;
    margin-left: 20px;
`;

const ChannelMeta = styled.div`
    flex: 1;
`;

const ChannelName = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #0f0f0f;
    margin-top: -10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
`;

const SubscriberCount = styled.div`
    font-size: 12px;
    color: #606060;
`;

const SubscribeButton = styled.button`
    background: #0f0f0f;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-left: -10px;
    margin-top: -10px;

    &:hover {
        background: #272727;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 24px;
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    background: #f2f2f2;
    border-radius: 20px;
    margin-right: 8px;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background: #f2f2f2;
    color: #0f0f0f;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: #e5e5e5;
    }
`;

const Divider = styled.div`
    width: 1px;
    height: 24px;
    background: #ccc;
`;

const DescriptionCard = styled.div`
    margin-top: 12px;
    padding: 12px;
    background: #f2f2f2;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: #e5e5e5;
    }
`;

const ViewCount = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #0f0f0f;
    margin-bottom: 8px;
`;

const Description = styled.p`
    font-size: 14px;
    line-height: 20px;
    color: #0f0f0f;
    white-space: pre-wrap;
    margin: 0;
`;

const SecondaryContent = styled.div`
    width: 426px;
    flex-shrink: 0;

    @media (max-width: 1200px) {
        display: none;
    }
`;

export default WatchPage;
