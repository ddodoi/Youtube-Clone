import { styled } from "styled-components";
// import { MediaQuery } from "../../pages/Channel";

const ChannelHeader = () => {
    const bannerImgURL =
        "https://yt3.googleusercontent.com/ad5OoGGexMhaZ3sT1YjIDCYbw_HcQnvFFkArA1LQEJVwrv-_PgbalL7YGBpt4-lemz28qMG4BA=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";
    const profileURL =
        "https://yt3.googleusercontent.com/ytc/AIdro_kqf6MgVU6c8LWzVAVqpggLLS4bTxdKe_aiQzM17HsqRhk=s120-c-k-c0x00ffffff-no-rj";

    return (
        <ChannelHeaderStyle>
            {bannerImgURL && (
                <Banner>
                    <img src={bannerImgURL} alt="배너" />
                </Banner>
            )}

            <ChannelInfo>
                <div>
                    <img src={profileURL} alt="채널 프로필" />
                </div>
                <div></div>
            </ChannelInfo>
        </ChannelHeaderStyle>
    );
};

const ChannelHeaderStyle = styled.header`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`;

export const MediaQuery = styled.div`
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

const Banner = styled(MediaQuery)`
    img {
        width: 100%;
        border-radius: 16px;
    }
`;

const ChannelInfo = styled(MediaQuery)`
    display: flex;
    padding-top: 16px;
    width: 100%;
`;

export default ChannelHeader;
