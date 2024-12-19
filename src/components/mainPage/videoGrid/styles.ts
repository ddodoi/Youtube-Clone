import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    gap: 16px;  
    width: 100%; 
    max-width: 2200px;  
    margin: 0 auto;
    padding: 16px 24px;
    
    @media (min-width: 2200px) {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    
    @media (min-width: 2000px) and (max-width: 2199px) {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    
    @media (min-width: 1600px) and (max-width: 1999px) {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    
    @media (min-width: 1200px) and (max-width: 1599px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    
    @media (min-width: 800px) and (max-width: 1199px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
    @media (min-width: 500px) and (max-width: 799px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    @media (max-width: 499px) {
        grid-template-columns: 1fr;
    }
`;