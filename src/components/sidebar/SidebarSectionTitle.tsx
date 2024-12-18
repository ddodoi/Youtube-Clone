import { ReactNode } from "react";
import { styled } from "styled-components";

interface Props {
    children: ReactNode;
}

const SidebarSectionTitle: React.FC<Props> = ({ children }) => {
    return <SidebarSectionTitleStyle>{children}</SidebarSectionTitleStyle>;
};

const SidebarSectionTitleStyle = styled.div`
    color: rgb(15, 15, 15);
    font-size: 16px;
    padding: 6px 12px 4px;
    font-weight: 500;
`;

export default SidebarSectionTitle;
