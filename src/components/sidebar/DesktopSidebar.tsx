import { styled } from "styled-components";
import SidebarFolded from "./SidebarFolded";
import { useLayoutStore } from "@stores/layoutStore";
import SidebarOpen from "./SidebarOpen";

const DesktopSidebar = () => {
    const { isDesktopSidebarOpen } = useLayoutStore();
    return (
        <DesktopSidebarStyle>
            {isDesktopSidebarOpen && <SidebarOpen />}
            {!isDesktopSidebarOpen && <SidebarFolded />}
        </DesktopSidebarStyle>
    );
};

const DesktopSidebarStyle = styled.div`
    display: none;
    @media screen and (${({ theme }) => theme.mediaQuery.sidebar.desktop}) {
        display: block;
    }
`;

export default DesktopSidebar;
