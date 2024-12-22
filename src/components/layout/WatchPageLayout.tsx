import { styled } from "styled-components";
import Header from "../header/Header";
import Sidebar from "@components/sidebar/Sidebar";

interface Props {
    children: React.ReactNode;
}

const WatchPageLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <Sidebar />
            <WatchPageLayoutStyle>{children}</WatchPageLayoutStyle>
        </>
    );
};

const WatchPageLayoutStyle = styled.main`
    width: 100%;
    margin: 56px 0 0 0px;
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: center;
`;

export default WatchPageLayout;
