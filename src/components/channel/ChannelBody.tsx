import { styled } from "styled-components";
import { PaddingMediaQuery } from "./ChannelHeader";
import { useChannel } from "@hooks/useChannel";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useVideos } from "@hooks/useVideos";
import { Channel } from "@@types/channel.type";

interface Props {
    contents: React.ReactNode;
    channel: Channel;
}

const ChannelBody: React.FC<Props> = ({ contents, channel }) => {
    const { videos, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useVideos();

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
