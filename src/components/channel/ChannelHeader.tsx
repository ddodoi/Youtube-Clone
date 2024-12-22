import { styled } from "styled-components";
import { formatNumber } from "../../utils/format";
import SubscribedButton from "./SubscribedButton";
import SubscribeButton from "./SubscribeButton";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@components/common/Tabs";
import { TabItem } from "../../pages/Channel";
import { useChannel } from "@hooks/useChannel";
import { useParams } from "react-router-dom";

interface Props {
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
    tabContents: TabItem[];
}

const ChannelHeader: React.FC<Props> = ({ setActiveIndex, activeIndex, tabContents }) => {
    const params = useParams();
    const channelId = Number(params.channelId) || undefined;
    const { channel } = useChannel({ channelId });
    const {
        bannerLocation: bannerURL,
        description,
        name: channelName,
        profileLocation: profileURL,
        subscribers,
        email,
        videoCount,
    } = channel;

    // const bannerURL = "";
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(true);

    const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    useEffect(() => {
        if (!bannerURL) setIsImgLoading(false);
    }, []);

    return (
        <ChannelHeaderStyle>
            {isImgLoading && (
                <BannerSkeleton>
                    <div></div>
                </BannerSkeleton>
            )}
            {bannerURL && (
                <Banner $isImgLoading={isImgLoading}>
                    <img src={bannerURL} alt="배너" onLoad={() => setIsImgLoading(false)} />
                </Banner>
            )}

            <ChannelInfo>
                <ChannelProfile>
                    <img src={profileURL} alt="채널 프로필" />
                </ChannelProfile>
                <ChannelMeta>
                    <div>
                        <h1>{channelName}</h1>
                        <Spans>
                            <span className="email">{email}</span>
                            <span>{`${formatNumber(subscribers)}명`}</span>
                            <span>{`${formatNumber(videoCount)}개`}</span>
                        </Spans>
                    </div>
                    <Description>{description}</Description>
                    <Subscribe>
                        <button onClick={handleSubscribe}>
                            {isSubscribed ? <SubscribedButton /> : <SubscribeButton />}
                        </button>
                    </Subscribe>
                </ChannelMeta>
            </ChannelInfo>
            <TabsWrapper>
                <Tabs setActiveIndex={setActiveIndex} activeIndex={activeIndex}>
                    {tabContents.map(({ title, contents }, i) => (
                        <Tab title={title} key={i}>
                            {contents}
                        </Tab>
                    ))}
                </Tabs>
            </TabsWrapper>
        </ChannelHeaderStyle>
    );
};

const ChannelHeaderStyle = styled.header`
    display: flex;
    flex-direction: column;
`;

export const PaddingMediaQuery = styled.div`
    @media screen and (${({ theme }) => theme.mediaQuery.mainPage.grid5}) {
        padding: 0 calc(50% - ${({ theme }) => theme.padding.grid5});
    }

    @media screen and (${({ theme }) => theme.mediaQuery.mainPage.grid4}) {
        padding: 0 calc(50% - ${({ theme }) => theme.padding.grid4});
    }

    @media screen and (${({ theme }) => theme.mediaQuery.mainPage.grid3}) {
        padding: 0 calc(50% - ${({ theme }) => theme.padding.grid3});
    }

    @media screen and (${({ theme }) => theme.mediaQuery.mainPage.grid2}) {
        padding: 0 calc(50% - ${({ theme }) => theme.padding.grid2});
    }

    @media screen and (${({ theme }) => theme.mediaQuery.mainPage.grid1}) {
        padding: 0 calc(50% - ${({ theme }) => theme.padding.grid1});
    }
`;

const FontMediaQuery = styled.div`
    font-size: 1.4rem;
    color: #606060;
    @media screen and (max-width: 1025px) {
        font-size: 1.2rem;
    }
`;

const Spans = styled(FontMediaQuery)`
    display: flex;
    align-items: center;

    span {
        display: flex;
        font-weight: 400;
        line-height: 1.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:not(:last-of-type)::after {
            content: "";
            display: inline-block;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: #606060;
            margin: auto 4px;
        }
    }

    .email {
        color: rgb(19, 19, 19);
        font-weight: 500;
    }
`;

const Description = styled(FontMediaQuery)`
    margin-top: 12px;
`;

const BannerSkeleton = styled(PaddingMediaQuery)`
    div {
        width: 100%;
        border-radius: 16px;
        object-fit: cover;
        height: 200px;
        background: rgb(219, 219, 219);
    }
`;

const Banner = styled(PaddingMediaQuery)<{ $isImgLoading: boolean }>`
    height: ${({ $isImgLoading }) => ($isImgLoading ? "0px" : "100%")};

    img {
        width: 100%;
        border-radius: 16px;
        object-fit: cover;
        height: 100%;
        max-height: 200px;
    }
`;

const ChannelInfo = styled(PaddingMediaQuery)`
    display: flex;
    padding-top: 16px;
    width: 100%;
`;

const TabsWrapper = styled(PaddingMediaQuery)``;

const ChannelProfile = styled.div`
    margin-right: 16px;
    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        /* @media screen and (max-width: 840px) {
            width: 120px;
            height: 120px;
        } */
    }
`;

const ChannelMeta = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        font-size: 3.6rem;
        line-height: 5rem;
        max-height: 10rem;
        font-weight: 700;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        white-space: normal;
        margin: 0;
    }
`;

const Subscribe = styled.div`
    margin: 12px 0 8px;
    button {
        border: none;
        outline: none;
        background: none;
    }
`;

export default ChannelHeader;
