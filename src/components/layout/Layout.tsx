import { styled } from "styled-components";
import Header from "../header/Header";
import DesktopSidebar from "@components/sidebar/DesktopSidebar";
import Sidebar from "@components/sidebar/Sidebar";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <DesktopSidebar />
            <Sidebar />
            <LayoutStyle>{children}</LayoutStyle>
        </>
    );
};

const LayoutStyle = styled.main`
    width: 100%;
    margin: 56px 0 0 72px;
    z-index: 100;
    position: relative;
`;

export default Layout;
