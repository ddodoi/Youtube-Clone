import ChannelBody from "@components/channel/ChannelBody";
import ChannelHeader from "@components/channel/ChannelHeader";
import { useLayoutStore } from "@stores/layoutStore";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const Channel = () => {
    const { channelId } = useParams();
    const { isDesktopSidebarOpen, isSidebarOpen } = useLayoutStore();

    return (
        <ChannelStyle $isDesktopSidebarOpen={isDesktopSidebarOpen} $isSidebarOpen={isSidebarOpen}>
            <ChannelHeader />
            <ChannelBody />
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
