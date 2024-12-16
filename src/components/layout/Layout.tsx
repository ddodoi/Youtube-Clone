import { styled } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

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
