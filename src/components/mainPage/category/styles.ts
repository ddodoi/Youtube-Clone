import styled from 'styled-components';

export const CategoryButton = styled.button<{ $isSelected: boolean }>`
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    background-color: ${({ $isSelected }) => 
        $isSelected ? '#0f0f0f' : '#f2f2f2'};
    color: ${({ $isSelected }) => 
        $isSelected ? '#ffffff' : '#0f0f0f'};
    font-size: 14px;
    font-weight: ${({ $isSelected }) => ($isSelected ? "500" : "400")};
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ $isSelected }) => 
            $isSelected ? '#0f0f0f' : '#e5e5e5'};
    }

    &:focus {
        outline: none;
    }
`;

export const CategoryListContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 3;
    display: flex;
    overflow-x: auto;
    padding: 12px 0;
    margin-bottom: 4px;
    background-color: #fff;

    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
`;

export const CategoryListWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 12px;
`;