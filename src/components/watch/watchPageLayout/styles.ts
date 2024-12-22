import styled from 'styled-components';

export const WatchVideoCard = styled.div`
    display: flex;
    gap: 8px;
    cursor: pointer;
    padding: 8px;
    border-radius: 12px;

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || '#e5e5e5'};
    }
`;

export const Thumbnail = styled.div`
    width: 168px;
    height: 94px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const VideoInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const Title = styled.h3`
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 4px 0;
    color: ${({ theme }) => theme?.colors?.text?.primary || '#030303'};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const ChannelName = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme?.colors?.text?.secondary || '#606060'};
    margin-bottom: 2px;
`;

export const MetaData = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme?.colors?.text?.secondary || '#606060'};
`;
