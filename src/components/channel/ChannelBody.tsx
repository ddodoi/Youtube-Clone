import { styled } from "styled-components";
import { PaddingMediaQuery } from "./ChannelHeader";

interface Props {
    contents: React.ReactNode;
}

const ChannelBody: React.FC<Props> = ({ contents }) => {
    return (
        <ChannelBodyStyle>
            <h1>바디</h1>
            {contents}
        </ChannelBodyStyle>
    );
};

const ChannelBodyStyle = styled(PaddingMediaQuery)``;

export default ChannelBody;
