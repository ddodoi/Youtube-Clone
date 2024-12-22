import ChannelBody from "@components/channel/ChannelBody";
import ChannelHeader from "@components/channel/ChannelHeader";
import ChannelVideos from "@components/channel/ChannelVideos";
import { useChannel } from "@hooks/useChannel";
import { useLayoutStore } from "@stores/layoutStore";
import { useState } from "react";
import { styled } from "styled-components";

export interface TabItem {
    title: string;
    contents: React.ReactNode;
}

const tabContents: TabItem[] = [
    {
        title: "홈",
        contents: <ChannelVideos />,
    },
    {
        title: "동영상",
        contents: <ChannelVideos />,
    },
    {
        title: "라이브",
        contents: <ChannelVideos />,
    },
    {
        title: "재생목록",
        contents: <ChannelVideos />,
    },
    {
        title: "커뮤니티",
        contents: <ChannelVideos />,
    },
];

const Channel = () => {
    const { isDesktopSidebarOpen, isSidebarOpen } = useLayoutStore();
    const [activeIndex, setActiveIndex] = useState(0);
    const contents = tabContents[activeIndex].contents;

    return (
        <ChannelStyle $isDesktopSidebarOpen={isDesktopSidebarOpen} $isSidebarOpen={isSidebarOpen}>
            <ChannelHeader
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                tabContents={tabContents}
            />
            <ChannelBody contents={contents} />
        </ChannelStyle>
    );
};

const ChannelStyle = styled.div<{ $isDesktopSidebarOpen: boolean; $isSidebarOpen: boolean }>`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;

    @media screen and (${({ theme }) => theme.mediaQuery.sidebar.desktop}) {
        left: ${({ $isDesktopSidebarOpen }) => ($isDesktopSidebarOpen ? "240px" : "64px")};
    }

    @media screen and (${({ theme }) => theme.mediaQuery.sidebar.tablet}) {
        left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "64px" : "64px")};
    }

    @media screen and (${({ theme }) => theme.mediaQuery.sidebar.mobile}) {
        left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "0px" : "0px")};
    }
`;

export default Channel;
