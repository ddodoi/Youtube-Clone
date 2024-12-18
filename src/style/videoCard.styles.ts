import { styled } from "styled-components";

export const MainPageContainer = styled.div`
    padding: 24px 40px;
    margin-top: 56px;
    margin-left: 72px;
    min-height: 100vh;
    background-color: ${(props) => props.theme.colors?.background || "#ffffff"};
    color: ${(props) => props.theme.colors?.text || "#000000"};
`;

export const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px 16px;
    padding: 24px 0;
    max-width: 2400px;
    margin: 0 auto;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const Container = styled.div<{ size: string }>`
    cursor: pointer;
    width: 100%;
`;

export const ThumbnailWrapper = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

export const Duration = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 3px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Title = styled.h3`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors?.text || "#0F0F0F"};
`;

export const Channel = styled.span`
    font-size: 14px;
    color: ${(props) => props.theme.colors?.secondaryText || "#606060"};
`;

export const Stats = styled.div`
    display: flex;
    color: ${(props) => props.theme.colors?.secondaryText || "#606060"};
    font-size: 14px;
`;

export const Views = styled.span`
    margin-right: 4px;
`;

export const Date = styled.span``;
