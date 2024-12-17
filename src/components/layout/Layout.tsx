import { styled } from "styled-components";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <Sidebar />
            <LayoutStyle>{children}</LayoutStyle>
        </>
    );
};

const LayoutStyle = styled.main`
    width: 100%;
    margin: 56px 0 0 72px;
`;

export default Layout;
