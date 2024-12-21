import { styled } from "styled-components";
import { PaddingMediaQuery } from "./ChannelHeader";
import { useChannel } from "@hooks/useChannel";

interface Props {
    contents: React.ReactNode;
}

const ChannelBody: React.FC<Props> = ({ contents }) => {
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useChannel();
    console.log(data);
    return (
        <ChannelBodyStyle>
            <button onClick={() => fetchNextPage()}>페이지 불러오기</button>
            <h1>바디</h1>
            {contents}
        </ChannelBodyStyle>
    );
};

const ChannelBodyStyle = styled(PaddingMediaQuery)``;

export default ChannelBody;
