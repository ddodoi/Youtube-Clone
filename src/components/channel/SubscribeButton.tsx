import { styled } from "styled-components";

const SubscribeButton = () => {
    return <SubscribeButtonStyle>구독</SubscribeButtonStyle>;
};

const SubscribeButtonStyle = styled.button`
    width: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #0f0f0f;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
    cursor: pointer;
`;

export default SubscribeButton;
