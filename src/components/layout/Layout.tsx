import { styled } from "styled-components";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return <LayoutStyle>{children}</LayoutStyle>;
};

const LayoutStyle = styled.div``;

export default Layout;
