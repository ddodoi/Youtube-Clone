import { ReactNode } from "react";
import { styled } from "styled-components";

interface Props {
    children: ReactNode;
}

const SidebarMenuItem: React.FC<Props> = ({ children }) => {
    return <SidebarMenuItemStyle>{children}</SidebarMenuItemStyle>;
};

const SidebarMenuItemStyle = styled.div`
    padding: 0 12px;
    height: 40px;
    align-content: center;
    border-radius: 10px;

    &:hover {
        outline: none;
        background-color: rgba(0, 0, 0, 0.05);
    }

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        line-height: 24px;
    }

    svg,
    img {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        margin-right: 24px;
        color: #030303;
    }

    span {
        color: #0f0f0f;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
`;

export default SidebarMenuItem;
