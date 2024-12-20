import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const Channel = () => {
    const { channelId } = useParams();

    return (
        <ChannelStyle>
            <h1>Channel: {channelId}</h1>
        </ChannelStyle>
    );
};

const ChannelStyle = styled.div``;

export default Channel;
