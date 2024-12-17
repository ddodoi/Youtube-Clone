import { ReactNode } from "react";
import { styled } from "styled-components";

interface Props {
    children: ReactNode;
}

const SidebarSection: React.FC<Props> = ({ children }) => {
    return <SidebarSectionStyle>{children}</SidebarSectionStyle>;
};

const SidebarSectionStyle = styled.div`
    margin: 12px;

    &:not(:first-of-type) {
        padding-top: 12px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

export default SidebarSection;
