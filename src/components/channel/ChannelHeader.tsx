import { styled } from "styled-components";
import { formatNumber } from "../../utils/format";
import SubscribedButton from "./SubscribedButton";
import SubscribeButton from "./SubscribeButton";
import { useState } from "react";
import { Tab, Tabs } from "@components/common/Tabs";
import { TabItem } from "../../pages/Channel";

interface Props {
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
    tabContents: TabItem[];
}

const ChannelHeader: React.FC<Props> = ({ setActiveIndex, activeIndex, tabContents }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const bannerImgURL =
        "https://yt3.googleusercontent.com/ad5OoGGexMhaZ3sT1YjIDCYbw_HcQnvFFkArA1LQEJVwrv-_PgbalL7YGBpt4-lemz28qMG4BA=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";
    const profileURL =
        "https://yt3.googleusercontent.com/ytc/AIdro_kqf6MgVU6c8LWzVAVqpggLLS4bTxdKe_aiQzM17HsqRhk=s120-c-k-c0x00ffffff-no-rj";

    const channelName = "슈카월드";
    const email = "@syukaworld";
    const subscribers = 3_440_000;
    const videoCount = 1_800;
    const description = `각종 문의 : ad@syukafriends.com 으로 부탁드립니다.
경제, 금융을 기반으로 달리는 방송!
정치는 아주. 전혀. 대단히. 모릅니다. 
누군가를 비판하거나 비난하지 않도록 노력하겠습니다.
실수가 있더라도 너그럽고 재미있게 봐주세요.
감사합니다.
`;
    const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };
    return (
        <ChannelHeaderStyle>
            {bannerImgURL && (
                <Banner>
                    <img src={bannerImgURL} alt="배너" />
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

const Banner = styled(PaddingMediaQuery)`
    img {
        width: 100%;
        border-radius: 16px;
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

        @media screen and (max-width: 840px) {
            width: 120px;
            height: 120px;
        }
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
