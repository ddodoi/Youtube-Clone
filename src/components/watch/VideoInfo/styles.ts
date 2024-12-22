import styled from "styled-components";

export const InfoContainer = styled.div`
    padding: 12px 0;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 1200px) {
        width: 800px;
    }

    @media (max-width: 856px) {
        width: 640px;
    }

    @media (max-width: 656px) {
        width: 426px;
    }
`;

export const Title = styled.h1`
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
`;

export const MetaSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
    width: 100%;
`;

export const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const ChannelAvatar = styled.div<{ $src: string }>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #e5e5e5;
    background-image: url(${(props) => props.$src});
    background-size: cover;
    background-position: center;
`;

export const ChannelMeta = styled.div`
    flex: 1;
`;

export const ChannelName = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
`;

export const SubscriberCount = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme?.colors?.text?.secondary || "#606060"};
`;

export const SubscribeButton = styled.button`
    background: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
    color: ${({ theme }) => theme?.colors?.background || "#ffffff"};
    border: none;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme?.colors?.text?.secondary || "#606060"};
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme?.colors?.border || "#e5e5e5"};
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme?.colors?.button?.background || "#f2f2f2"};
    border-radius: 20px;
    margin-right: 8px;
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border: none;
    border-radius: 18px;
    background: ${({ theme }) => theme?.colors?.button?.background || "#f2f2f2"};
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || "#e5e5e5"};
    }
`;

export const Divider = styled.div`
    width: 1px;
    height: 24px;
    background: ${({ theme }) => theme?.colors?.border || "#e5e5e5"};
`;

export const Description = styled.div`
    margin-top: 8px;
    padding: 8px;
    background: ${({ theme }) => theme?.colors?.button?.background || "#f2f2f2"};
    border-radius: 10px;
    width: 100%;
`;

export const ViewCount = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
    margin-bottom: 8px;
`;

// ... 나머지 스타일 컴포넌트들
