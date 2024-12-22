import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 24px;
`;

export const CategoryTabs = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    padding: 0 8px;
`;

export const Tab = styled.button<{ $isSelected: boolean }>`
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: ${(props) => (props.$isSelected ? '#0f0f0f' : '#f2f2f2')};
    color: ${(props) => (props.$isSelected ? '#ffffff' : '#0f0f0f')};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.$isSelected ? '#0f0f0f' : '#e5e5e5')};
    }
`;

export const VideoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`; 