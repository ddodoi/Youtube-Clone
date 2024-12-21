import React, { ReactElement } from "react";
import { styled } from "styled-components";

interface TabProps {
    title: string;
    children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
    return <div>{children}</div>;
};

interface TabsProps {
    children: React.ReactNode;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
}

const Tabs: React.FC<TabsProps> = ({ children, setActiveIndex, activeIndex }) => {
    const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];

    return (
        <TabsStyle>
            {tabs.map((tab, i) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveIndex(i)}
                    className={i === activeIndex ? "active" : ""}
                >
                    {tab.props.title}
                </button>
            ))}
        </TabsStyle>
    );
};

const TabsStyle = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;

    button {
        background: none;
        border: none;
        outline: none;
        height: 48px;
        min-width: 48px;
        font-size: 1.6rem;
        line-height: 2.2rem;
        font-weight: 500;
        cursor: pointer;
        &:hover {
            border-bottom: 2px solid #606060;
        }

        &.active {
            border-bottom: 2px solid #0f0f0f;
        }
    }
`;

export { Tabs, Tab };
