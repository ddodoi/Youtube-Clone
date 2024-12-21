import { styled } from "styled-components";

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

const ChannelBodyStyle = styled.div``;

export default ChannelBody;
