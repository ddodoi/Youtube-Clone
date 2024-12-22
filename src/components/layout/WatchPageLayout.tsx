import { styled } from "styled-components";
import Header from "../header/Header";
import DesktopSidebar from "@components/sidebar/DesktopSidebar";
import Sidebar from "@components/sidebar/Sidebar";

interface Props {
    children: React.ReactNode;
}

const WatchPageLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            {/* <DesktopSidebar /> */}
            <Sidebar />
            <WatchPageLayoutStyle>{children}</WatchPageLayoutStyle>
        </>
    );
};

const WatchPageLayoutStyle = styled.main`
    width: 100%;
    margin: 56px 0 0 0px;
`;

export default WatchPageLayout;
