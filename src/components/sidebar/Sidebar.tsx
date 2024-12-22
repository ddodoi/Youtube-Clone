import { styled } from "styled-components";
import SidebarOpen from "./SidebarOpen";
import SidebarFolded from "./SidebarFolded";
import { useLayoutStore } from "@stores/layoutStore";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useLayoutStore();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const [isWatchPage] = useState(location.pathname === "/watch");

    const handleBackgroundClick = () => {
        setIsSidebarOpen(false);
    };

    return (
        <SidebarStyle $isSidebarOpen={isSidebarOpen} ref={sidebarRef} $isWatchPage={isWatchPage}>
            <SidebarOpen className="sidebar-open" />
            <div className="background" onClick={handleBackgroundClick}></div>
            <SidebarFolded />
        </SidebarStyle>
    );
};

interface SidebarStyleProps {
    $isSidebarOpen: boolean;
    $isWatchPage: boolean;
}

const SidebarStyle = styled.div<SidebarStyleProps>`
    display: block;

    .sidebar-open {
        transition: transform 0.2s ease-in-out;
        transform: translateX(${({ $isSidebarOpen }) => ($isSidebarOpen ? "0" : "-240px")});
    }

    .background {
        transition:
            opacity 0.2s ease-in-out,
            z-index ${({ $isSidebarOpen }) => ($isSidebarOpen ? "0.01s" : "1s")} ease-in-out;
        width: 100vw;
        height: 100vh;
        opacity: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 1 : 0)};
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        z-index: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 3000 : 0)};
    }

    @media screen and (${({ theme }) => theme.mediaQuery.sidebar.desktop}) {
        display: ${({ $isWatchPage }) => ($isWatchPage ? "block" : "none")};
    }
`;

export default Sidebar;
