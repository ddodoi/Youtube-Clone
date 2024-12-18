import { styled } from "styled-components";
import SidebarOpen from "./SidebarOpen";
import SidebarFolded from "./SidebarFolded";
import { useLayoutStore } from "@stores/layoutStore";
import { useEffect, useRef } from "react";

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useLayoutStore();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleBackgroundClick = () => {
            setIsSidebarOpen(false);
        };

        backgroundRef.current?.addEventListener("click", handleBackgroundClick);

        return () => backgroundRef.current?.removeEventListener("click", handleBackgroundClick);
    }, []);

    return (
        <SidebarStyle $isSidebarOpen={isSidebarOpen} ref={sidebarRef}>
            <SidebarOpen className="sidebar-open" />
            <div className="background" ref={backgroundRef}></div>
            <SidebarFolded />
        </SidebarStyle>
    );
};

interface SidebarStyleProps {
    $isSidebarOpen: boolean;
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
        display: none;
    }
`;

export default Sidebar;
