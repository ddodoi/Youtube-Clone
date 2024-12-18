import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 2100px;
    margin: 0 auto;
    padding: 24px;
    overflow-x: hidden;
    
    @media (max-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;